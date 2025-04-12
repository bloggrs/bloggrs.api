const prisma = require("../prisma");
const { ErrorHandler } = require("../utils/error");

const permissionMap = {
  'editor': {
    'blogpostcategories': ['read', 'create', 'update'],
    'blogs': ['read', 'create', 'update', 'delete'],
    'posts': ['read', 'create', 'update', 'delete'],
    'blog:posts': ['read', 'create', 'update', 'delete']
  },
  'moderator': {
    'blogpostcategories': ['read', 'create', 'update', 'delete'],
    'blogcategories': ['read', 'create', 'update', 'delete'],
    'blogs': ['read', 'create', 'update', 'delete'],
    'posts': ['read', 'create', 'update', 'delete'],
    'blog:posts': ['read', 'create', 'update', 'delete']
  },
  'viewer': {
    'blogpostcategories': ['read'],
    'blogs': ['read'],
    'posts': ['read'],
    'blog:posts': ['read']
  },
  // Add team member roles here
  'team_admin': {
    'posts': ['read', 'create', 'update', 'delete'],
    'blog:posts': ['read', 'create', 'update', 'delete']
  },
  'team_editor': {
    'posts': ['read', 'create', 'update'],
    'blog:posts': ['read', 'create', 'update']
  },
  'team_member': {
    'posts': ['read', 'create'],
    'blog:posts': ['read', 'create']
  }
};

const checkPermission = (resource, action) => {
  return async (req, res, next) => {
    return next(); // TODO: Remove this
    try {
      // Add debug logging
      console.log('Request user:', req.user);
      console.log('Request headers:', req.headers);
      
      // If resource contains colon, split it
      if (resource.includes(':')) {
        [resource, action] = resource.split(':');
      }
      
      console.log('Resource:', resource);
      console.log('Action:', action);
      
      if (!req.user) {
        throw new ErrorHandler(401, 'No user found in request. Make sure authentication middleware is applied first.');
      }
      
      if (!req.user.id) {
        throw new ErrorHandler(401, 'User ID is missing from authenticated user');
      }

      // Fetch user with roles and team members from Prisma
      const user = await prisma.users.findUnique({
        where: { id: req.user.id },
        include: {
          roles: true,
          teammembers: {
            include: {
              blogs: true,
              users: true,
              blogpermissions: true,
              temporaryaccesses: true,
              teammemberspermissions: true
            }
          }
        }
      });
      
      if (!user || (!user.roles?.length && !user.teammembers?.length)) {
        throw new ErrorHandler(403, 'User has no roles or team memberships assigned');
      }
      
      // Check if user has required permission through team membership
      const hasTeamPermission = user.teammembers?.some(member => {
        return member.blogpermissions.some(perm => 
          perm.resourceType === resource && 
          perm.action === action
        );
      });

      // Check if user has required permission through user permissions
      const hasUserPermission = user.teammembers?.some(member =>
        member.teammemberspermissions?.some(perm => 
          perm.resource === resource &&
          perm.action === action
        )
      );

      // Check role-based permissions using checkUserPermission function
      const hasRolePermission = await checkUserPermission(user, resource, action);

      const hasPermission = hasTeamPermission || hasUserPermission || hasRolePermission;
      
      console.log('User roles:', user.roles.map(r => r.name));
      console.log('Has permission:', hasPermission);
      
      if (!hasPermission) {
        throw new ErrorHandler(403, `You don't have permission to ${action} ${resource}`);
      }
      
      next();
    } catch (error) {
      // Add more detailed error logging
      console.error('Permission check failed:', {
        error: error.message,
        stack: error.stack,
        code: error.code,
        resource,
        action,
        userId: req?.user?.id
      });
      
      // Check if error is already an ErrorHandler instance
      if (error instanceof ErrorHandler) {
        throw error;  // Pass through our custom errors directly
      }
      
      // Handle Prisma-specific errors
      if (error.code) {
        switch (error.code) {
          case 'P2002':
            throw new ErrorHandler(409, 'Unique constraint violation: A record with this value already exists');
          case 'P2003':
            throw new ErrorHandler(400, 'Foreign key constraint violation: Referenced record does not exist');
          case 'P2025':
            throw new ErrorHandler(404, 'Record not found');
          case 'P2014':
            throw new ErrorHandler(400, 'Invalid ID: The provided ID is invalid');
          case 'P2015':
            throw new ErrorHandler(400, 'Related record not found');
          case 'P2016':
            throw new ErrorHandler(400, 'Query interpretation error');
          case 'P2017':
            throw new ErrorHandler(400, 'Records in relations not connected');
          case 'P2024':
            throw new ErrorHandler(503, 'Database connection timeout');
          default:
            console.log('Database error:', error);
            throw new ErrorHandler(500, `Database error: ${error.message}`);
        }
      }
      
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      throw new ErrorHandler(500, 'Internal server error');
    }
  };
};

async function checkUserPermission(user, resource, action) {
  console.log('Checking permissions for:', {
    userId: user.id,
    roles: user.roles.map(r => r.name),
    teamMembers: user.teammembers?.map(tm => ({
      role: tm.role?.name,
      permissions: permissionMap[tm.role?.name]
    })),
    resource,
    action
  });

  // Check if user has admin role
  if (user.roles.some(role => role.name === 'admin')) return true;
  
  // Check team member roles first
  if (user.teammembers?.length) {
    const hasTeamPermission = user.teammembers.some(member => {
      const rolePerms = permissionMap[member.role?.name];
      if (!rolePerms) return false;
      
      if (resource.includes(':')) {
        const [parentResource, childResource] = resource.split(':');
        return rolePerms[`${parentResource}:${childResource}`]?.includes(action);
      }
      
      return rolePerms[resource]?.includes(action);
    });
    
    if (hasTeamPermission) return true;
  }
  
  // Fall back to checking user roles
  return user.roles.some(role => {
    const rolePerms = permissionMap[role.name];
    if (!rolePerms) return false;
    
    // Handle composite resources like 'blog:posts'
    if (resource.includes(':')) {
      const [parentResource, childResource] = resource.split(':');
      return rolePerms[`${parentResource}:${childResource}`]?.includes(action);
    }
    
    return rolePerms[resource]?.includes(action);
  });
}

module.exports = checkPermission; 