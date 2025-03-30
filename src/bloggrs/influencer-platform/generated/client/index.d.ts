
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Influencer
 * 
 */
export type Influencer = $Result.DefaultSelection<Prisma.$InfluencerPayload>
/**
 * Model Brand
 * 
 */
export type Brand = $Result.DefaultSelection<Prisma.$BrandPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model Sponsorship
 * 
 */
export type Sponsorship = $Result.DefaultSelection<Prisma.$SponsorshipPayload>
/**
 * Model SocialProfile
 * 
 */
export type SocialProfile = $Result.DefaultSelection<Prisma.$SocialProfilePayload>
/**
 * Model Content
 * 
 */
export type Content = $Result.DefaultSelection<Prisma.$ContentPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Influencers
 * const influencers = await prisma.influencer.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Influencers
   * const influencers = await prisma.influencer.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.influencer`: Exposes CRUD operations for the **Influencer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Influencers
    * const influencers = await prisma.influencer.findMany()
    * ```
    */
  get influencer(): Prisma.InfluencerDelegate<ExtArgs>;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<ExtArgs>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs>;

  /**
   * `prisma.sponsorship`: Exposes CRUD operations for the **Sponsorship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sponsorships
    * const sponsorships = await prisma.sponsorship.findMany()
    * ```
    */
  get sponsorship(): Prisma.SponsorshipDelegate<ExtArgs>;

  /**
   * `prisma.socialProfile`: Exposes CRUD operations for the **SocialProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialProfiles
    * const socialProfiles = await prisma.socialProfile.findMany()
    * ```
    */
  get socialProfile(): Prisma.SocialProfileDelegate<ExtArgs>;

  /**
   * `prisma.content`: Exposes CRUD operations for the **Content** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contents
    * const contents = await prisma.content.findMany()
    * ```
    */
  get content(): Prisma.ContentDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.21.1
   * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Influencer: 'Influencer',
    Brand: 'Brand',
    Campaign: 'Campaign',
    Sponsorship: 'Sponsorship',
    SocialProfile: 'SocialProfile',
    Content: 'Content'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "influencer" | "brand" | "campaign" | "sponsorship" | "socialProfile" | "content"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Influencer: {
        payload: Prisma.$InfluencerPayload<ExtArgs>
        fields: Prisma.InfluencerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InfluencerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InfluencerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>
          }
          findFirst: {
            args: Prisma.InfluencerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InfluencerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>
          }
          findMany: {
            args: Prisma.InfluencerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>[]
          }
          create: {
            args: Prisma.InfluencerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>
          }
          createMany: {
            args: Prisma.InfluencerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InfluencerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>
          }
          update: {
            args: Prisma.InfluencerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>
          }
          deleteMany: {
            args: Prisma.InfluencerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InfluencerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InfluencerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InfluencerPayload>
          }
          aggregate: {
            args: Prisma.InfluencerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInfluencer>
          }
          groupBy: {
            args: Prisma.InfluencerGroupByArgs<ExtArgs>
            result: $Utils.Optional<InfluencerGroupByOutputType>[]
          }
          count: {
            args: Prisma.InfluencerCountArgs<ExtArgs>
            result: $Utils.Optional<InfluencerCountAggregateOutputType> | number
          }
        }
      }
      Brand: {
        payload: Prisma.$BrandPayload<ExtArgs>
        fields: Prisma.BrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findFirst: {
            args: Prisma.BrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findMany: {
            args: Prisma.BrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          create: {
            args: Prisma.BrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          createMany: {
            args: Prisma.BrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          update: {
            args: Prisma.BrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          deleteMany: {
            args: Prisma.BrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          aggregate: {
            args: Prisma.BrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrand>
          }
          groupBy: {
            args: Prisma.BrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrandCountArgs<ExtArgs>
            result: $Utils.Optional<BrandCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      Sponsorship: {
        payload: Prisma.$SponsorshipPayload<ExtArgs>
        fields: Prisma.SponsorshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SponsorshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SponsorshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>
          }
          findFirst: {
            args: Prisma.SponsorshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SponsorshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>
          }
          findMany: {
            args: Prisma.SponsorshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>[]
          }
          create: {
            args: Prisma.SponsorshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>
          }
          createMany: {
            args: Prisma.SponsorshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SponsorshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>
          }
          update: {
            args: Prisma.SponsorshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>
          }
          deleteMany: {
            args: Prisma.SponsorshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SponsorshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SponsorshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SponsorshipPayload>
          }
          aggregate: {
            args: Prisma.SponsorshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSponsorship>
          }
          groupBy: {
            args: Prisma.SponsorshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<SponsorshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.SponsorshipCountArgs<ExtArgs>
            result: $Utils.Optional<SponsorshipCountAggregateOutputType> | number
          }
        }
      }
      SocialProfile: {
        payload: Prisma.$SocialProfilePayload<ExtArgs>
        fields: Prisma.SocialProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocialProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocialProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>
          }
          findFirst: {
            args: Prisma.SocialProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocialProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>
          }
          findMany: {
            args: Prisma.SocialProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>[]
          }
          create: {
            args: Prisma.SocialProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>
          }
          createMany: {
            args: Prisma.SocialProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SocialProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>
          }
          update: {
            args: Prisma.SocialProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>
          }
          deleteMany: {
            args: Prisma.SocialProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocialProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SocialProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialProfilePayload>
          }
          aggregate: {
            args: Prisma.SocialProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocialProfile>
          }
          groupBy: {
            args: Prisma.SocialProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocialProfileCountArgs<ExtArgs>
            result: $Utils.Optional<SocialProfileCountAggregateOutputType> | number
          }
        }
      }
      Content: {
        payload: Prisma.$ContentPayload<ExtArgs>
        fields: Prisma.ContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findFirst: {
            args: Prisma.ContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findMany: {
            args: Prisma.ContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          create: {
            args: Prisma.ContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          createMany: {
            args: Prisma.ContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          update: {
            args: Prisma.ContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          deleteMany: {
            args: Prisma.ContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          aggregate: {
            args: Prisma.ContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContent>
          }
          groupBy: {
            args: Prisma.ContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentCountArgs<ExtArgs>
            result: $Utils.Optional<ContentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type InfluencerCountOutputType
   */

  export type InfluencerCountOutputType = {
    socialProfiles: number
    campaigns: number
    sponsorships: number
    content: number
  }

  export type InfluencerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialProfiles?: boolean | InfluencerCountOutputTypeCountSocialProfilesArgs
    campaigns?: boolean | InfluencerCountOutputTypeCountCampaignsArgs
    sponsorships?: boolean | InfluencerCountOutputTypeCountSponsorshipsArgs
    content?: boolean | InfluencerCountOutputTypeCountContentArgs
  }

  // Custom InputTypes
  /**
   * InfluencerCountOutputType without action
   */
  export type InfluencerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InfluencerCountOutputType
     */
    select?: InfluencerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InfluencerCountOutputType without action
   */
  export type InfluencerCountOutputTypeCountSocialProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialProfileWhereInput
  }

  /**
   * InfluencerCountOutputType without action
   */
  export type InfluencerCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }

  /**
   * InfluencerCountOutputType without action
   */
  export type InfluencerCountOutputTypeCountSponsorshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SponsorshipWhereInput
  }

  /**
   * InfluencerCountOutputType without action
   */
  export type InfluencerCountOutputTypeCountContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
  }


  /**
   * Count Type BrandCountOutputType
   */

  export type BrandCountOutputType = {
    campaigns: number
    sponsorships: number
  }

  export type BrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | BrandCountOutputTypeCountCampaignsArgs
    sponsorships?: boolean | BrandCountOutputTypeCountSponsorshipsArgs
  }

  // Custom InputTypes
  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandCountOutputType
     */
    select?: BrandCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountSponsorshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SponsorshipWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    influencers: number
    content: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    influencers?: boolean | CampaignCountOutputTypeCountInfluencersArgs
    content?: boolean | CampaignCountOutputTypeCountContentArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountInfluencersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InfluencerWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Influencer
   */

  export type AggregateInfluencer = {
    _count: InfluencerCountAggregateOutputType | null
    _avg: InfluencerAvgAggregateOutputType | null
    _sum: InfluencerSumAggregateOutputType | null
    _min: InfluencerMinAggregateOutputType | null
    _max: InfluencerMaxAggregateOutputType | null
  }

  export type InfluencerAvgAggregateOutputType = {
    followers: number | null
    engagementRate: number | null
    posts: number | null
  }

  export type InfluencerSumAggregateOutputType = {
    followers: number | null
    engagementRate: number | null
    posts: number | null
  }

  export type InfluencerMinAggregateOutputType = {
    id: string | null
    handle: string | null
    name: string | null
    bio: string | null
    image: string | null
    category: string | null
    followers: number | null
    engagementRate: number | null
    posts: number | null
    verified: boolean | null
    featured: boolean | null
    tagType: string | null
    email: string | null
    phone: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InfluencerMaxAggregateOutputType = {
    id: string | null
    handle: string | null
    name: string | null
    bio: string | null
    image: string | null
    category: string | null
    followers: number | null
    engagementRate: number | null
    posts: number | null
    verified: boolean | null
    featured: boolean | null
    tagType: string | null
    email: string | null
    phone: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InfluencerCountAggregateOutputType = {
    id: number
    handle: number
    name: number
    bio: number
    image: number
    category: number
    followers: number
    engagementRate: number
    posts: number
    verified: number
    featured: number
    tagType: number
    email: number
    phone: number
    location: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InfluencerAvgAggregateInputType = {
    followers?: true
    engagementRate?: true
    posts?: true
  }

  export type InfluencerSumAggregateInputType = {
    followers?: true
    engagementRate?: true
    posts?: true
  }

  export type InfluencerMinAggregateInputType = {
    id?: true
    handle?: true
    name?: true
    bio?: true
    image?: true
    category?: true
    followers?: true
    engagementRate?: true
    posts?: true
    verified?: true
    featured?: true
    tagType?: true
    email?: true
    phone?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InfluencerMaxAggregateInputType = {
    id?: true
    handle?: true
    name?: true
    bio?: true
    image?: true
    category?: true
    followers?: true
    engagementRate?: true
    posts?: true
    verified?: true
    featured?: true
    tagType?: true
    email?: true
    phone?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InfluencerCountAggregateInputType = {
    id?: true
    handle?: true
    name?: true
    bio?: true
    image?: true
    category?: true
    followers?: true
    engagementRate?: true
    posts?: true
    verified?: true
    featured?: true
    tagType?: true
    email?: true
    phone?: true
    location?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InfluencerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Influencer to aggregate.
     */
    where?: InfluencerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Influencers to fetch.
     */
    orderBy?: InfluencerOrderByWithRelationInput | InfluencerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InfluencerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Influencers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Influencers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Influencers
    **/
    _count?: true | InfluencerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InfluencerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InfluencerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InfluencerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InfluencerMaxAggregateInputType
  }

  export type GetInfluencerAggregateType<T extends InfluencerAggregateArgs> = {
        [P in keyof T & keyof AggregateInfluencer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInfluencer[P]>
      : GetScalarType<T[P], AggregateInfluencer[P]>
  }




  export type InfluencerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InfluencerWhereInput
    orderBy?: InfluencerOrderByWithAggregationInput | InfluencerOrderByWithAggregationInput[]
    by: InfluencerScalarFieldEnum[] | InfluencerScalarFieldEnum
    having?: InfluencerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InfluencerCountAggregateInputType | true
    _avg?: InfluencerAvgAggregateInputType
    _sum?: InfluencerSumAggregateInputType
    _min?: InfluencerMinAggregateInputType
    _max?: InfluencerMaxAggregateInputType
  }

  export type InfluencerGroupByOutputType = {
    id: string
    handle: string
    name: string
    bio: string | null
    image: string | null
    category: string | null
    followers: number
    engagementRate: number | null
    posts: number | null
    verified: boolean
    featured: boolean
    tagType: string | null
    email: string | null
    phone: string | null
    location: string | null
    tags: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: InfluencerCountAggregateOutputType | null
    _avg: InfluencerAvgAggregateOutputType | null
    _sum: InfluencerSumAggregateOutputType | null
    _min: InfluencerMinAggregateOutputType | null
    _max: InfluencerMaxAggregateOutputType | null
  }

  type GetInfluencerGroupByPayload<T extends InfluencerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InfluencerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InfluencerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InfluencerGroupByOutputType[P]>
            : GetScalarType<T[P], InfluencerGroupByOutputType[P]>
        }
      >
    >


  export type InfluencerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    handle?: boolean
    name?: boolean
    bio?: boolean
    image?: boolean
    category?: boolean
    followers?: boolean
    engagementRate?: boolean
    posts?: boolean
    verified?: boolean
    featured?: boolean
    tagType?: boolean
    email?: boolean
    phone?: boolean
    location?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialProfiles?: boolean | Influencer$socialProfilesArgs<ExtArgs>
    campaigns?: boolean | Influencer$campaignsArgs<ExtArgs>
    sponsorships?: boolean | Influencer$sponsorshipsArgs<ExtArgs>
    content?: boolean | Influencer$contentArgs<ExtArgs>
    _count?: boolean | InfluencerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["influencer"]>


  export type InfluencerSelectScalar = {
    id?: boolean
    handle?: boolean
    name?: boolean
    bio?: boolean
    image?: boolean
    category?: boolean
    followers?: boolean
    engagementRate?: boolean
    posts?: boolean
    verified?: boolean
    featured?: boolean
    tagType?: boolean
    email?: boolean
    phone?: boolean
    location?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InfluencerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialProfiles?: boolean | Influencer$socialProfilesArgs<ExtArgs>
    campaigns?: boolean | Influencer$campaignsArgs<ExtArgs>
    sponsorships?: boolean | Influencer$sponsorshipsArgs<ExtArgs>
    content?: boolean | Influencer$contentArgs<ExtArgs>
    _count?: boolean | InfluencerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InfluencerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Influencer"
    objects: {
      socialProfiles: Prisma.$SocialProfilePayload<ExtArgs>[]
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
      sponsorships: Prisma.$SponsorshipPayload<ExtArgs>[]
      content: Prisma.$ContentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      handle: string
      name: string
      bio: string | null
      image: string | null
      category: string | null
      followers: number
      engagementRate: number | null
      posts: number | null
      verified: boolean
      featured: boolean
      tagType: string | null
      email: string | null
      phone: string | null
      location: string | null
      tags: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["influencer"]>
    composites: {}
  }

  type InfluencerGetPayload<S extends boolean | null | undefined | InfluencerDefaultArgs> = $Result.GetResult<Prisma.$InfluencerPayload, S>

  type InfluencerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InfluencerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InfluencerCountAggregateInputType | true
    }

  export interface InfluencerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Influencer'], meta: { name: 'Influencer' } }
    /**
     * Find zero or one Influencer that matches the filter.
     * @param {InfluencerFindUniqueArgs} args - Arguments to find a Influencer
     * @example
     * // Get one Influencer
     * const influencer = await prisma.influencer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InfluencerFindUniqueArgs>(args: SelectSubset<T, InfluencerFindUniqueArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Influencer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InfluencerFindUniqueOrThrowArgs} args - Arguments to find a Influencer
     * @example
     * // Get one Influencer
     * const influencer = await prisma.influencer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InfluencerFindUniqueOrThrowArgs>(args: SelectSubset<T, InfluencerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Influencer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerFindFirstArgs} args - Arguments to find a Influencer
     * @example
     * // Get one Influencer
     * const influencer = await prisma.influencer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InfluencerFindFirstArgs>(args?: SelectSubset<T, InfluencerFindFirstArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Influencer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerFindFirstOrThrowArgs} args - Arguments to find a Influencer
     * @example
     * // Get one Influencer
     * const influencer = await prisma.influencer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InfluencerFindFirstOrThrowArgs>(args?: SelectSubset<T, InfluencerFindFirstOrThrowArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Influencers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Influencers
     * const influencers = await prisma.influencer.findMany()
     * 
     * // Get first 10 Influencers
     * const influencers = await prisma.influencer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const influencerWithIdOnly = await prisma.influencer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InfluencerFindManyArgs>(args?: SelectSubset<T, InfluencerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Influencer.
     * @param {InfluencerCreateArgs} args - Arguments to create a Influencer.
     * @example
     * // Create one Influencer
     * const Influencer = await prisma.influencer.create({
     *   data: {
     *     // ... data to create a Influencer
     *   }
     * })
     * 
     */
    create<T extends InfluencerCreateArgs>(args: SelectSubset<T, InfluencerCreateArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Influencers.
     * @param {InfluencerCreateManyArgs} args - Arguments to create many Influencers.
     * @example
     * // Create many Influencers
     * const influencer = await prisma.influencer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InfluencerCreateManyArgs>(args?: SelectSubset<T, InfluencerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Influencer.
     * @param {InfluencerDeleteArgs} args - Arguments to delete one Influencer.
     * @example
     * // Delete one Influencer
     * const Influencer = await prisma.influencer.delete({
     *   where: {
     *     // ... filter to delete one Influencer
     *   }
     * })
     * 
     */
    delete<T extends InfluencerDeleteArgs>(args: SelectSubset<T, InfluencerDeleteArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Influencer.
     * @param {InfluencerUpdateArgs} args - Arguments to update one Influencer.
     * @example
     * // Update one Influencer
     * const influencer = await prisma.influencer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InfluencerUpdateArgs>(args: SelectSubset<T, InfluencerUpdateArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Influencers.
     * @param {InfluencerDeleteManyArgs} args - Arguments to filter Influencers to delete.
     * @example
     * // Delete a few Influencers
     * const { count } = await prisma.influencer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InfluencerDeleteManyArgs>(args?: SelectSubset<T, InfluencerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Influencers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Influencers
     * const influencer = await prisma.influencer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InfluencerUpdateManyArgs>(args: SelectSubset<T, InfluencerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Influencer.
     * @param {InfluencerUpsertArgs} args - Arguments to update or create a Influencer.
     * @example
     * // Update or create a Influencer
     * const influencer = await prisma.influencer.upsert({
     *   create: {
     *     // ... data to create a Influencer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Influencer we want to update
     *   }
     * })
     */
    upsert<T extends InfluencerUpsertArgs>(args: SelectSubset<T, InfluencerUpsertArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Influencers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerCountArgs} args - Arguments to filter Influencers to count.
     * @example
     * // Count the number of Influencers
     * const count = await prisma.influencer.count({
     *   where: {
     *     // ... the filter for the Influencers we want to count
     *   }
     * })
    **/
    count<T extends InfluencerCountArgs>(
      args?: Subset<T, InfluencerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InfluencerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Influencer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InfluencerAggregateArgs>(args: Subset<T, InfluencerAggregateArgs>): Prisma.PrismaPromise<GetInfluencerAggregateType<T>>

    /**
     * Group by Influencer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InfluencerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InfluencerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InfluencerGroupByArgs['orderBy'] }
        : { orderBy?: InfluencerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InfluencerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInfluencerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Influencer model
   */
  readonly fields: InfluencerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Influencer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InfluencerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socialProfiles<T extends Influencer$socialProfilesArgs<ExtArgs> = {}>(args?: Subset<T, Influencer$socialProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "findMany"> | Null>
    campaigns<T extends Influencer$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, Influencer$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany"> | Null>
    sponsorships<T extends Influencer$sponsorshipsArgs<ExtArgs> = {}>(args?: Subset<T, Influencer$sponsorshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findMany"> | Null>
    content<T extends Influencer$contentArgs<ExtArgs> = {}>(args?: Subset<T, Influencer$contentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Influencer model
   */ 
  interface InfluencerFieldRefs {
    readonly id: FieldRef<"Influencer", 'String'>
    readonly handle: FieldRef<"Influencer", 'String'>
    readonly name: FieldRef<"Influencer", 'String'>
    readonly bio: FieldRef<"Influencer", 'String'>
    readonly image: FieldRef<"Influencer", 'String'>
    readonly category: FieldRef<"Influencer", 'String'>
    readonly followers: FieldRef<"Influencer", 'Int'>
    readonly engagementRate: FieldRef<"Influencer", 'Float'>
    readonly posts: FieldRef<"Influencer", 'Int'>
    readonly verified: FieldRef<"Influencer", 'Boolean'>
    readonly featured: FieldRef<"Influencer", 'Boolean'>
    readonly tagType: FieldRef<"Influencer", 'String'>
    readonly email: FieldRef<"Influencer", 'String'>
    readonly phone: FieldRef<"Influencer", 'String'>
    readonly location: FieldRef<"Influencer", 'String'>
    readonly tags: FieldRef<"Influencer", 'Json'>
    readonly createdAt: FieldRef<"Influencer", 'DateTime'>
    readonly updatedAt: FieldRef<"Influencer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Influencer findUnique
   */
  export type InfluencerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * Filter, which Influencer to fetch.
     */
    where: InfluencerWhereUniqueInput
  }

  /**
   * Influencer findUniqueOrThrow
   */
  export type InfluencerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * Filter, which Influencer to fetch.
     */
    where: InfluencerWhereUniqueInput
  }

  /**
   * Influencer findFirst
   */
  export type InfluencerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * Filter, which Influencer to fetch.
     */
    where?: InfluencerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Influencers to fetch.
     */
    orderBy?: InfluencerOrderByWithRelationInput | InfluencerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Influencers.
     */
    cursor?: InfluencerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Influencers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Influencers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Influencers.
     */
    distinct?: InfluencerScalarFieldEnum | InfluencerScalarFieldEnum[]
  }

  /**
   * Influencer findFirstOrThrow
   */
  export type InfluencerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * Filter, which Influencer to fetch.
     */
    where?: InfluencerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Influencers to fetch.
     */
    orderBy?: InfluencerOrderByWithRelationInput | InfluencerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Influencers.
     */
    cursor?: InfluencerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Influencers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Influencers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Influencers.
     */
    distinct?: InfluencerScalarFieldEnum | InfluencerScalarFieldEnum[]
  }

  /**
   * Influencer findMany
   */
  export type InfluencerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * Filter, which Influencers to fetch.
     */
    where?: InfluencerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Influencers to fetch.
     */
    orderBy?: InfluencerOrderByWithRelationInput | InfluencerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Influencers.
     */
    cursor?: InfluencerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Influencers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Influencers.
     */
    skip?: number
    distinct?: InfluencerScalarFieldEnum | InfluencerScalarFieldEnum[]
  }

  /**
   * Influencer create
   */
  export type InfluencerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * The data needed to create a Influencer.
     */
    data: XOR<InfluencerCreateInput, InfluencerUncheckedCreateInput>
  }

  /**
   * Influencer createMany
   */
  export type InfluencerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Influencers.
     */
    data: InfluencerCreateManyInput | InfluencerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Influencer update
   */
  export type InfluencerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * The data needed to update a Influencer.
     */
    data: XOR<InfluencerUpdateInput, InfluencerUncheckedUpdateInput>
    /**
     * Choose, which Influencer to update.
     */
    where: InfluencerWhereUniqueInput
  }

  /**
   * Influencer updateMany
   */
  export type InfluencerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Influencers.
     */
    data: XOR<InfluencerUpdateManyMutationInput, InfluencerUncheckedUpdateManyInput>
    /**
     * Filter which Influencers to update
     */
    where?: InfluencerWhereInput
  }

  /**
   * Influencer upsert
   */
  export type InfluencerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * The filter to search for the Influencer to update in case it exists.
     */
    where: InfluencerWhereUniqueInput
    /**
     * In case the Influencer found by the `where` argument doesn't exist, create a new Influencer with this data.
     */
    create: XOR<InfluencerCreateInput, InfluencerUncheckedCreateInput>
    /**
     * In case the Influencer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InfluencerUpdateInput, InfluencerUncheckedUpdateInput>
  }

  /**
   * Influencer delete
   */
  export type InfluencerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    /**
     * Filter which Influencer to delete.
     */
    where: InfluencerWhereUniqueInput
  }

  /**
   * Influencer deleteMany
   */
  export type InfluencerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Influencers to delete
     */
    where?: InfluencerWhereInput
  }

  /**
   * Influencer.socialProfiles
   */
  export type Influencer$socialProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    where?: SocialProfileWhereInput
    orderBy?: SocialProfileOrderByWithRelationInput | SocialProfileOrderByWithRelationInput[]
    cursor?: SocialProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SocialProfileScalarFieldEnum | SocialProfileScalarFieldEnum[]
  }

  /**
   * Influencer.campaigns
   */
  export type Influencer$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Influencer.sponsorships
   */
  export type Influencer$sponsorshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    where?: SponsorshipWhereInput
    orderBy?: SponsorshipOrderByWithRelationInput | SponsorshipOrderByWithRelationInput[]
    cursor?: SponsorshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SponsorshipScalarFieldEnum | SponsorshipScalarFieldEnum[]
  }

  /**
   * Influencer.content
   */
  export type Influencer$contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Influencer without action
   */
  export type InfluencerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
  }


  /**
   * Model Brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandMinAggregateOutputType = {
    id: string | null
    name: string | null
    logo: string | null
    industry: string | null
    website: string | null
    description: string | null
    contactName: string | null
    contactEmail: string | null
    contactPhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandMaxAggregateOutputType = {
    id: string | null
    name: string | null
    logo: string | null
    industry: string | null
    website: string | null
    description: string | null
    contactName: string | null
    contactEmail: string | null
    contactPhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    name: number
    logo: number
    industry: number
    website: number
    description: number
    contactName: number
    contactEmail: number
    contactPhone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrandMinAggregateInputType = {
    id?: true
    name?: true
    logo?: true
    industry?: true
    website?: true
    description?: true
    contactName?: true
    contactEmail?: true
    contactPhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    name?: true
    logo?: true
    industry?: true
    website?: true
    description?: true
    contactName?: true
    contactEmail?: true
    contactPhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    name?: true
    logo?: true
    industry?: true
    website?: true
    description?: true
    contactName?: true
    contactEmail?: true
    contactPhone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brand to aggregate.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type BrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandWhereInput
    orderBy?: BrandOrderByWithAggregationInput | BrandOrderByWithAggregationInput[]
    by: BrandScalarFieldEnum[] | BrandScalarFieldEnum
    having?: BrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }

  export type BrandGroupByOutputType = {
    id: string
    name: string
    logo: string | null
    industry: string | null
    website: string | null
    description: string | null
    contactName: string | null
    contactEmail: string | null
    contactPhone: string | null
    createdAt: Date
    updatedAt: Date
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends BrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type BrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logo?: boolean
    industry?: boolean
    website?: boolean
    description?: boolean
    contactName?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaigns?: boolean | Brand$campaignsArgs<ExtArgs>
    sponsorships?: boolean | Brand$sponsorshipsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>


  export type BrandSelectScalar = {
    id?: boolean
    name?: boolean
    logo?: boolean
    industry?: boolean
    website?: boolean
    description?: boolean
    contactName?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | Brand$campaignsArgs<ExtArgs>
    sponsorships?: boolean | Brand$sponsorshipsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brand"
    objects: {
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
      sponsorships: Prisma.$SponsorshipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      logo: string | null
      industry: string | null
      website: string | null
      description: string | null
      contactName: string | null
      contactEmail: string | null
      contactPhone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brand"]>
    composites: {}
  }

  type BrandGetPayload<S extends boolean | null | undefined | BrandDefaultArgs> = $Result.GetResult<Prisma.$BrandPayload, S>

  type BrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BrandFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BrandCountAggregateInputType | true
    }

  export interface BrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Brand'], meta: { name: 'Brand' } }
    /**
     * Find zero or one Brand that matches the filter.
     * @param {BrandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrandFindUniqueArgs>(args: SelectSubset<T, BrandFindUniqueArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Brand that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BrandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(args: SelectSubset<T, BrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrandFindFirstArgs>(args?: SelectSubset<T, BrandFindFirstArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Brand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(args?: SelectSubset<T, BrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrandFindManyArgs>(args?: SelectSubset<T, BrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Brand.
     * @param {BrandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
     */
    create<T extends BrandCreateArgs>(args: SelectSubset<T, BrandCreateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Brands.
     * @param {BrandCreateManyArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrandCreateManyArgs>(args?: SelectSubset<T, BrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Brand.
     * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
     */
    delete<T extends BrandDeleteArgs>(args: SelectSubset<T, BrandDeleteArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Brand.
     * @param {BrandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrandUpdateArgs>(args: SelectSubset<T, BrandUpdateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Brands.
     * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrandDeleteManyArgs>(args?: SelectSubset<T, BrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrandUpdateManyArgs>(args: SelectSubset<T, BrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Brand.
     * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
     */
    upsert<T extends BrandUpsertArgs>(args: SelectSubset<T, BrandUpsertArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends BrandCountArgs>(
      args?: Subset<T, BrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandGroupByArgs['orderBy'] }
        : { orderBy?: BrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Brand model
   */
  readonly fields: BrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaigns<T extends Brand$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany"> | Null>
    sponsorships<T extends Brand$sponsorshipsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$sponsorshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Brand model
   */ 
  interface BrandFieldRefs {
    readonly id: FieldRef<"Brand", 'String'>
    readonly name: FieldRef<"Brand", 'String'>
    readonly logo: FieldRef<"Brand", 'String'>
    readonly industry: FieldRef<"Brand", 'String'>
    readonly website: FieldRef<"Brand", 'String'>
    readonly description: FieldRef<"Brand", 'String'>
    readonly contactName: FieldRef<"Brand", 'String'>
    readonly contactEmail: FieldRef<"Brand", 'String'>
    readonly contactPhone: FieldRef<"Brand", 'String'>
    readonly createdAt: FieldRef<"Brand", 'DateTime'>
    readonly updatedAt: FieldRef<"Brand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Brand findUnique
   */
  export type BrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findUniqueOrThrow
   */
  export type BrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findFirst
   */
  export type BrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findFirstOrThrow
   */
  export type BrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findMany
   */
  export type BrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brands to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand create
   */
  export type BrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to create a Brand.
     */
    data: XOR<BrandCreateInput, BrandUncheckedCreateInput>
  }

  /**
   * Brand createMany
   */
  export type BrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand update
   */
  export type BrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to update a Brand.
     */
    data: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
    /**
     * Choose, which Brand to update.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand updateMany
   */
  export type BrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
  }

  /**
   * Brand upsert
   */
  export type BrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The filter to search for the Brand to update in case it exists.
     */
    where: BrandWhereUniqueInput
    /**
     * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
     */
    create: XOR<BrandCreateInput, BrandUncheckedCreateInput>
    /**
     * In case the Brand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
  }

  /**
   * Brand delete
   */
  export type BrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter which Brand to delete.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand deleteMany
   */
  export type BrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brands to delete
     */
    where?: BrandWhereInput
  }

  /**
   * Brand.campaigns
   */
  export type Brand$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Brand.sponsorships
   */
  export type Brand$sponsorshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    where?: SponsorshipWhereInput
    orderBy?: SponsorshipOrderByWithRelationInput | SponsorshipOrderByWithRelationInput[]
    cursor?: SponsorshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SponsorshipScalarFieldEnum | SponsorshipScalarFieldEnum[]
  }

  /**
   * Brand without action
   */
  export type BrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignAvgAggregateOutputType = {
    budget: number | null
  }

  export type CampaignSumAggregateOutputType = {
    budget: number | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: string | null
    budget: number | null
    startDate: Date | null
    endDate: Date | null
    requirements: string | null
    goals: string | null
    createdAt: Date | null
    updatedAt: Date | null
    brandId: string | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: string | null
    budget: number | null
    startDate: Date | null
    endDate: Date | null
    requirements: string | null
    goals: string | null
    createdAt: Date | null
    updatedAt: Date | null
    brandId: string | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    budget: number
    startDate: number
    endDate: number
    requirements: number
    goals: number
    createdAt: number
    updatedAt: number
    brandId: number
    _all: number
  }


  export type CampaignAvgAggregateInputType = {
    budget?: true
  }

  export type CampaignSumAggregateInputType = {
    budget?: true
  }

  export type CampaignMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    budget?: true
    startDate?: true
    endDate?: true
    requirements?: true
    goals?: true
    createdAt?: true
    updatedAt?: true
    brandId?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    budget?: true
    startDate?: true
    endDate?: true
    requirements?: true
    goals?: true
    createdAt?: true
    updatedAt?: true
    brandId?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    budget?: true
    startDate?: true
    endDate?: true
    requirements?: true
    goals?: true
    createdAt?: true
    updatedAt?: true
    brandId?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _avg?: CampaignAvgAggregateInputType
    _sum?: CampaignSumAggregateInputType
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: string
    budget: number | null
    startDate: Date | null
    endDate: Date | null
    requirements: string | null
    goals: string | null
    createdAt: Date
    updatedAt: Date
    brandId: string
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    budget?: boolean
    startDate?: boolean
    endDate?: boolean
    requirements?: boolean
    goals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brandId?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    influencers?: boolean | Campaign$influencersArgs<ExtArgs>
    content?: boolean | Campaign$contentArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>


  export type CampaignSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    budget?: boolean
    startDate?: boolean
    endDate?: boolean
    requirements?: boolean
    goals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brandId?: boolean
  }

  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    influencers?: boolean | Campaign$influencersArgs<ExtArgs>
    content?: boolean | Campaign$contentArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>
      influencers: Prisma.$InfluencerPayload<ExtArgs>[]
      content: Prisma.$ContentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: string
      budget: number | null
      startDate: Date | null
      endDate: Date | null
      requirements: string | null
      goals: string | null
      createdAt: Date
      updatedAt: Date
      brandId: string
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    influencers<T extends Campaign$influencersArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$influencersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findMany"> | Null>
    content<T extends Campaign$contentArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$contentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */ 
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly description: FieldRef<"Campaign", 'String'>
    readonly status: FieldRef<"Campaign", 'String'>
    readonly budget: FieldRef<"Campaign", 'Float'>
    readonly startDate: FieldRef<"Campaign", 'DateTime'>
    readonly endDate: FieldRef<"Campaign", 'DateTime'>
    readonly requirements: FieldRef<"Campaign", 'String'>
    readonly goals: FieldRef<"Campaign", 'String'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
    readonly brandId: FieldRef<"Campaign", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
  }

  /**
   * Campaign.influencers
   */
  export type Campaign$influencersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Influencer
     */
    select?: InfluencerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InfluencerInclude<ExtArgs> | null
    where?: InfluencerWhereInput
    orderBy?: InfluencerOrderByWithRelationInput | InfluencerOrderByWithRelationInput[]
    cursor?: InfluencerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InfluencerScalarFieldEnum | InfluencerScalarFieldEnum[]
  }

  /**
   * Campaign.content
   */
  export type Campaign$contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model Sponsorship
   */

  export type AggregateSponsorship = {
    _count: SponsorshipCountAggregateOutputType | null
    _avg: SponsorshipAvgAggregateOutputType | null
    _sum: SponsorshipSumAggregateOutputType | null
    _min: SponsorshipMinAggregateOutputType | null
    _max: SponsorshipMaxAggregateOutputType | null
  }

  export type SponsorshipAvgAggregateOutputType = {
    compensation: number | null
  }

  export type SponsorshipSumAggregateOutputType = {
    compensation: number | null
  }

  export type SponsorshipMinAggregateOutputType = {
    id: string | null
    startDate: Date | null
    endDate: Date | null
    terms: string | null
    compensation: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    brandId: string | null
    influencerId: string | null
  }

  export type SponsorshipMaxAggregateOutputType = {
    id: string | null
    startDate: Date | null
    endDate: Date | null
    terms: string | null
    compensation: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    brandId: string | null
    influencerId: string | null
  }

  export type SponsorshipCountAggregateOutputType = {
    id: number
    startDate: number
    endDate: number
    terms: number
    compensation: number
    status: number
    createdAt: number
    updatedAt: number
    brandId: number
    influencerId: number
    _all: number
  }


  export type SponsorshipAvgAggregateInputType = {
    compensation?: true
  }

  export type SponsorshipSumAggregateInputType = {
    compensation?: true
  }

  export type SponsorshipMinAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    terms?: true
    compensation?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    brandId?: true
    influencerId?: true
  }

  export type SponsorshipMaxAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    terms?: true
    compensation?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    brandId?: true
    influencerId?: true
  }

  export type SponsorshipCountAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    terms?: true
    compensation?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    brandId?: true
    influencerId?: true
    _all?: true
  }

  export type SponsorshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sponsorship to aggregate.
     */
    where?: SponsorshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sponsorships to fetch.
     */
    orderBy?: SponsorshipOrderByWithRelationInput | SponsorshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SponsorshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sponsorships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sponsorships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sponsorships
    **/
    _count?: true | SponsorshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SponsorshipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SponsorshipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SponsorshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SponsorshipMaxAggregateInputType
  }

  export type GetSponsorshipAggregateType<T extends SponsorshipAggregateArgs> = {
        [P in keyof T & keyof AggregateSponsorship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSponsorship[P]>
      : GetScalarType<T[P], AggregateSponsorship[P]>
  }




  export type SponsorshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SponsorshipWhereInput
    orderBy?: SponsorshipOrderByWithAggregationInput | SponsorshipOrderByWithAggregationInput[]
    by: SponsorshipScalarFieldEnum[] | SponsorshipScalarFieldEnum
    having?: SponsorshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SponsorshipCountAggregateInputType | true
    _avg?: SponsorshipAvgAggregateInputType
    _sum?: SponsorshipSumAggregateInputType
    _min?: SponsorshipMinAggregateInputType
    _max?: SponsorshipMaxAggregateInputType
  }

  export type SponsorshipGroupByOutputType = {
    id: string
    startDate: Date
    endDate: Date
    terms: string | null
    compensation: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    brandId: string
    influencerId: string
    _count: SponsorshipCountAggregateOutputType | null
    _avg: SponsorshipAvgAggregateOutputType | null
    _sum: SponsorshipSumAggregateOutputType | null
    _min: SponsorshipMinAggregateOutputType | null
    _max: SponsorshipMaxAggregateOutputType | null
  }

  type GetSponsorshipGroupByPayload<T extends SponsorshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SponsorshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SponsorshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SponsorshipGroupByOutputType[P]>
            : GetScalarType<T[P], SponsorshipGroupByOutputType[P]>
        }
      >
    >


  export type SponsorshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    terms?: boolean
    compensation?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brandId?: boolean
    influencerId?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    influencer?: boolean | InfluencerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sponsorship"]>


  export type SponsorshipSelectScalar = {
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    terms?: boolean
    compensation?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brandId?: boolean
    influencerId?: boolean
  }

  export type SponsorshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    influencer?: boolean | InfluencerDefaultArgs<ExtArgs>
  }

  export type $SponsorshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sponsorship"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>
      influencer: Prisma.$InfluencerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      startDate: Date
      endDate: Date
      terms: string | null
      compensation: number | null
      status: string
      createdAt: Date
      updatedAt: Date
      brandId: string
      influencerId: string
    }, ExtArgs["result"]["sponsorship"]>
    composites: {}
  }

  type SponsorshipGetPayload<S extends boolean | null | undefined | SponsorshipDefaultArgs> = $Result.GetResult<Prisma.$SponsorshipPayload, S>

  type SponsorshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SponsorshipFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SponsorshipCountAggregateInputType | true
    }

  export interface SponsorshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sponsorship'], meta: { name: 'Sponsorship' } }
    /**
     * Find zero or one Sponsorship that matches the filter.
     * @param {SponsorshipFindUniqueArgs} args - Arguments to find a Sponsorship
     * @example
     * // Get one Sponsorship
     * const sponsorship = await prisma.sponsorship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SponsorshipFindUniqueArgs>(args: SelectSubset<T, SponsorshipFindUniqueArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sponsorship that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SponsorshipFindUniqueOrThrowArgs} args - Arguments to find a Sponsorship
     * @example
     * // Get one Sponsorship
     * const sponsorship = await prisma.sponsorship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SponsorshipFindUniqueOrThrowArgs>(args: SelectSubset<T, SponsorshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sponsorship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipFindFirstArgs} args - Arguments to find a Sponsorship
     * @example
     * // Get one Sponsorship
     * const sponsorship = await prisma.sponsorship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SponsorshipFindFirstArgs>(args?: SelectSubset<T, SponsorshipFindFirstArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sponsorship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipFindFirstOrThrowArgs} args - Arguments to find a Sponsorship
     * @example
     * // Get one Sponsorship
     * const sponsorship = await prisma.sponsorship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SponsorshipFindFirstOrThrowArgs>(args?: SelectSubset<T, SponsorshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sponsorships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sponsorships
     * const sponsorships = await prisma.sponsorship.findMany()
     * 
     * // Get first 10 Sponsorships
     * const sponsorships = await prisma.sponsorship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sponsorshipWithIdOnly = await prisma.sponsorship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SponsorshipFindManyArgs>(args?: SelectSubset<T, SponsorshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sponsorship.
     * @param {SponsorshipCreateArgs} args - Arguments to create a Sponsorship.
     * @example
     * // Create one Sponsorship
     * const Sponsorship = await prisma.sponsorship.create({
     *   data: {
     *     // ... data to create a Sponsorship
     *   }
     * })
     * 
     */
    create<T extends SponsorshipCreateArgs>(args: SelectSubset<T, SponsorshipCreateArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sponsorships.
     * @param {SponsorshipCreateManyArgs} args - Arguments to create many Sponsorships.
     * @example
     * // Create many Sponsorships
     * const sponsorship = await prisma.sponsorship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SponsorshipCreateManyArgs>(args?: SelectSubset<T, SponsorshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sponsorship.
     * @param {SponsorshipDeleteArgs} args - Arguments to delete one Sponsorship.
     * @example
     * // Delete one Sponsorship
     * const Sponsorship = await prisma.sponsorship.delete({
     *   where: {
     *     // ... filter to delete one Sponsorship
     *   }
     * })
     * 
     */
    delete<T extends SponsorshipDeleteArgs>(args: SelectSubset<T, SponsorshipDeleteArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sponsorship.
     * @param {SponsorshipUpdateArgs} args - Arguments to update one Sponsorship.
     * @example
     * // Update one Sponsorship
     * const sponsorship = await prisma.sponsorship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SponsorshipUpdateArgs>(args: SelectSubset<T, SponsorshipUpdateArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sponsorships.
     * @param {SponsorshipDeleteManyArgs} args - Arguments to filter Sponsorships to delete.
     * @example
     * // Delete a few Sponsorships
     * const { count } = await prisma.sponsorship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SponsorshipDeleteManyArgs>(args?: SelectSubset<T, SponsorshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sponsorships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sponsorships
     * const sponsorship = await prisma.sponsorship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SponsorshipUpdateManyArgs>(args: SelectSubset<T, SponsorshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sponsorship.
     * @param {SponsorshipUpsertArgs} args - Arguments to update or create a Sponsorship.
     * @example
     * // Update or create a Sponsorship
     * const sponsorship = await prisma.sponsorship.upsert({
     *   create: {
     *     // ... data to create a Sponsorship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sponsorship we want to update
     *   }
     * })
     */
    upsert<T extends SponsorshipUpsertArgs>(args: SelectSubset<T, SponsorshipUpsertArgs<ExtArgs>>): Prisma__SponsorshipClient<$Result.GetResult<Prisma.$SponsorshipPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sponsorships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipCountArgs} args - Arguments to filter Sponsorships to count.
     * @example
     * // Count the number of Sponsorships
     * const count = await prisma.sponsorship.count({
     *   where: {
     *     // ... the filter for the Sponsorships we want to count
     *   }
     * })
    **/
    count<T extends SponsorshipCountArgs>(
      args?: Subset<T, SponsorshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SponsorshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sponsorship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SponsorshipAggregateArgs>(args: Subset<T, SponsorshipAggregateArgs>): Prisma.PrismaPromise<GetSponsorshipAggregateType<T>>

    /**
     * Group by Sponsorship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SponsorshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SponsorshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SponsorshipGroupByArgs['orderBy'] }
        : { orderBy?: SponsorshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SponsorshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSponsorshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sponsorship model
   */
  readonly fields: SponsorshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sponsorship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SponsorshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    influencer<T extends InfluencerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InfluencerDefaultArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sponsorship model
   */ 
  interface SponsorshipFieldRefs {
    readonly id: FieldRef<"Sponsorship", 'String'>
    readonly startDate: FieldRef<"Sponsorship", 'DateTime'>
    readonly endDate: FieldRef<"Sponsorship", 'DateTime'>
    readonly terms: FieldRef<"Sponsorship", 'String'>
    readonly compensation: FieldRef<"Sponsorship", 'Float'>
    readonly status: FieldRef<"Sponsorship", 'String'>
    readonly createdAt: FieldRef<"Sponsorship", 'DateTime'>
    readonly updatedAt: FieldRef<"Sponsorship", 'DateTime'>
    readonly brandId: FieldRef<"Sponsorship", 'String'>
    readonly influencerId: FieldRef<"Sponsorship", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Sponsorship findUnique
   */
  export type SponsorshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * Filter, which Sponsorship to fetch.
     */
    where: SponsorshipWhereUniqueInput
  }

  /**
   * Sponsorship findUniqueOrThrow
   */
  export type SponsorshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * Filter, which Sponsorship to fetch.
     */
    where: SponsorshipWhereUniqueInput
  }

  /**
   * Sponsorship findFirst
   */
  export type SponsorshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * Filter, which Sponsorship to fetch.
     */
    where?: SponsorshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sponsorships to fetch.
     */
    orderBy?: SponsorshipOrderByWithRelationInput | SponsorshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sponsorships.
     */
    cursor?: SponsorshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sponsorships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sponsorships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sponsorships.
     */
    distinct?: SponsorshipScalarFieldEnum | SponsorshipScalarFieldEnum[]
  }

  /**
   * Sponsorship findFirstOrThrow
   */
  export type SponsorshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * Filter, which Sponsorship to fetch.
     */
    where?: SponsorshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sponsorships to fetch.
     */
    orderBy?: SponsorshipOrderByWithRelationInput | SponsorshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sponsorships.
     */
    cursor?: SponsorshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sponsorships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sponsorships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sponsorships.
     */
    distinct?: SponsorshipScalarFieldEnum | SponsorshipScalarFieldEnum[]
  }

  /**
   * Sponsorship findMany
   */
  export type SponsorshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * Filter, which Sponsorships to fetch.
     */
    where?: SponsorshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sponsorships to fetch.
     */
    orderBy?: SponsorshipOrderByWithRelationInput | SponsorshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sponsorships.
     */
    cursor?: SponsorshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sponsorships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sponsorships.
     */
    skip?: number
    distinct?: SponsorshipScalarFieldEnum | SponsorshipScalarFieldEnum[]
  }

  /**
   * Sponsorship create
   */
  export type SponsorshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * The data needed to create a Sponsorship.
     */
    data: XOR<SponsorshipCreateInput, SponsorshipUncheckedCreateInput>
  }

  /**
   * Sponsorship createMany
   */
  export type SponsorshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sponsorships.
     */
    data: SponsorshipCreateManyInput | SponsorshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sponsorship update
   */
  export type SponsorshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * The data needed to update a Sponsorship.
     */
    data: XOR<SponsorshipUpdateInput, SponsorshipUncheckedUpdateInput>
    /**
     * Choose, which Sponsorship to update.
     */
    where: SponsorshipWhereUniqueInput
  }

  /**
   * Sponsorship updateMany
   */
  export type SponsorshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sponsorships.
     */
    data: XOR<SponsorshipUpdateManyMutationInput, SponsorshipUncheckedUpdateManyInput>
    /**
     * Filter which Sponsorships to update
     */
    where?: SponsorshipWhereInput
  }

  /**
   * Sponsorship upsert
   */
  export type SponsorshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * The filter to search for the Sponsorship to update in case it exists.
     */
    where: SponsorshipWhereUniqueInput
    /**
     * In case the Sponsorship found by the `where` argument doesn't exist, create a new Sponsorship with this data.
     */
    create: XOR<SponsorshipCreateInput, SponsorshipUncheckedCreateInput>
    /**
     * In case the Sponsorship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SponsorshipUpdateInput, SponsorshipUncheckedUpdateInput>
  }

  /**
   * Sponsorship delete
   */
  export type SponsorshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
    /**
     * Filter which Sponsorship to delete.
     */
    where: SponsorshipWhereUniqueInput
  }

  /**
   * Sponsorship deleteMany
   */
  export type SponsorshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sponsorships to delete
     */
    where?: SponsorshipWhereInput
  }

  /**
   * Sponsorship without action
   */
  export type SponsorshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sponsorship
     */
    select?: SponsorshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SponsorshipInclude<ExtArgs> | null
  }


  /**
   * Model SocialProfile
   */

  export type AggregateSocialProfile = {
    _count: SocialProfileCountAggregateOutputType | null
    _avg: SocialProfileAvgAggregateOutputType | null
    _sum: SocialProfileSumAggregateOutputType | null
    _min: SocialProfileMinAggregateOutputType | null
    _max: SocialProfileMaxAggregateOutputType | null
  }

  export type SocialProfileAvgAggregateOutputType = {
    followers: number | null
  }

  export type SocialProfileSumAggregateOutputType = {
    followers: number | null
  }

  export type SocialProfileMinAggregateOutputType = {
    id: string | null
    platform: string | null
    handle: string | null
    url: string | null
    followers: number | null
    createdAt: Date | null
    updatedAt: Date | null
    influencerId: string | null
  }

  export type SocialProfileMaxAggregateOutputType = {
    id: string | null
    platform: string | null
    handle: string | null
    url: string | null
    followers: number | null
    createdAt: Date | null
    updatedAt: Date | null
    influencerId: string | null
  }

  export type SocialProfileCountAggregateOutputType = {
    id: number
    platform: number
    handle: number
    url: number
    followers: number
    createdAt: number
    updatedAt: number
    influencerId: number
    _all: number
  }


  export type SocialProfileAvgAggregateInputType = {
    followers?: true
  }

  export type SocialProfileSumAggregateInputType = {
    followers?: true
  }

  export type SocialProfileMinAggregateInputType = {
    id?: true
    platform?: true
    handle?: true
    url?: true
    followers?: true
    createdAt?: true
    updatedAt?: true
    influencerId?: true
  }

  export type SocialProfileMaxAggregateInputType = {
    id?: true
    platform?: true
    handle?: true
    url?: true
    followers?: true
    createdAt?: true
    updatedAt?: true
    influencerId?: true
  }

  export type SocialProfileCountAggregateInputType = {
    id?: true
    platform?: true
    handle?: true
    url?: true
    followers?: true
    createdAt?: true
    updatedAt?: true
    influencerId?: true
    _all?: true
  }

  export type SocialProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialProfile to aggregate.
     */
    where?: SocialProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialProfiles to fetch.
     */
    orderBy?: SocialProfileOrderByWithRelationInput | SocialProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocialProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SocialProfiles
    **/
    _count?: true | SocialProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SocialProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SocialProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialProfileMaxAggregateInputType
  }

  export type GetSocialProfileAggregateType<T extends SocialProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateSocialProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocialProfile[P]>
      : GetScalarType<T[P], AggregateSocialProfile[P]>
  }




  export type SocialProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialProfileWhereInput
    orderBy?: SocialProfileOrderByWithAggregationInput | SocialProfileOrderByWithAggregationInput[]
    by: SocialProfileScalarFieldEnum[] | SocialProfileScalarFieldEnum
    having?: SocialProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialProfileCountAggregateInputType | true
    _avg?: SocialProfileAvgAggregateInputType
    _sum?: SocialProfileSumAggregateInputType
    _min?: SocialProfileMinAggregateInputType
    _max?: SocialProfileMaxAggregateInputType
  }

  export type SocialProfileGroupByOutputType = {
    id: string
    platform: string
    handle: string
    url: string | null
    followers: number | null
    createdAt: Date
    updatedAt: Date
    influencerId: string
    _count: SocialProfileCountAggregateOutputType | null
    _avg: SocialProfileAvgAggregateOutputType | null
    _sum: SocialProfileSumAggregateOutputType | null
    _min: SocialProfileMinAggregateOutputType | null
    _max: SocialProfileMaxAggregateOutputType | null
  }

  type GetSocialProfileGroupByPayload<T extends SocialProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialProfileGroupByOutputType[P]>
            : GetScalarType<T[P], SocialProfileGroupByOutputType[P]>
        }
      >
    >


  export type SocialProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    handle?: boolean
    url?: boolean
    followers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    influencerId?: boolean
    influencer?: boolean | InfluencerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialProfile"]>


  export type SocialProfileSelectScalar = {
    id?: boolean
    platform?: boolean
    handle?: boolean
    url?: boolean
    followers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    influencerId?: boolean
  }

  export type SocialProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    influencer?: boolean | InfluencerDefaultArgs<ExtArgs>
  }

  export type $SocialProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SocialProfile"
    objects: {
      influencer: Prisma.$InfluencerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platform: string
      handle: string
      url: string | null
      followers: number | null
      createdAt: Date
      updatedAt: Date
      influencerId: string
    }, ExtArgs["result"]["socialProfile"]>
    composites: {}
  }

  type SocialProfileGetPayload<S extends boolean | null | undefined | SocialProfileDefaultArgs> = $Result.GetResult<Prisma.$SocialProfilePayload, S>

  type SocialProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SocialProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SocialProfileCountAggregateInputType | true
    }

  export interface SocialProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SocialProfile'], meta: { name: 'SocialProfile' } }
    /**
     * Find zero or one SocialProfile that matches the filter.
     * @param {SocialProfileFindUniqueArgs} args - Arguments to find a SocialProfile
     * @example
     * // Get one SocialProfile
     * const socialProfile = await prisma.socialProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialProfileFindUniqueArgs>(args: SelectSubset<T, SocialProfileFindUniqueArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SocialProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SocialProfileFindUniqueOrThrowArgs} args - Arguments to find a SocialProfile
     * @example
     * // Get one SocialProfile
     * const socialProfile = await prisma.socialProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, SocialProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SocialProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileFindFirstArgs} args - Arguments to find a SocialProfile
     * @example
     * // Get one SocialProfile
     * const socialProfile = await prisma.socialProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialProfileFindFirstArgs>(args?: SelectSubset<T, SocialProfileFindFirstArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SocialProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileFindFirstOrThrowArgs} args - Arguments to find a SocialProfile
     * @example
     * // Get one SocialProfile
     * const socialProfile = await prisma.socialProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, SocialProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SocialProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SocialProfiles
     * const socialProfiles = await prisma.socialProfile.findMany()
     * 
     * // Get first 10 SocialProfiles
     * const socialProfiles = await prisma.socialProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialProfileWithIdOnly = await prisma.socialProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocialProfileFindManyArgs>(args?: SelectSubset<T, SocialProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SocialProfile.
     * @param {SocialProfileCreateArgs} args - Arguments to create a SocialProfile.
     * @example
     * // Create one SocialProfile
     * const SocialProfile = await prisma.socialProfile.create({
     *   data: {
     *     // ... data to create a SocialProfile
     *   }
     * })
     * 
     */
    create<T extends SocialProfileCreateArgs>(args: SelectSubset<T, SocialProfileCreateArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SocialProfiles.
     * @param {SocialProfileCreateManyArgs} args - Arguments to create many SocialProfiles.
     * @example
     * // Create many SocialProfiles
     * const socialProfile = await prisma.socialProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocialProfileCreateManyArgs>(args?: SelectSubset<T, SocialProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SocialProfile.
     * @param {SocialProfileDeleteArgs} args - Arguments to delete one SocialProfile.
     * @example
     * // Delete one SocialProfile
     * const SocialProfile = await prisma.socialProfile.delete({
     *   where: {
     *     // ... filter to delete one SocialProfile
     *   }
     * })
     * 
     */
    delete<T extends SocialProfileDeleteArgs>(args: SelectSubset<T, SocialProfileDeleteArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SocialProfile.
     * @param {SocialProfileUpdateArgs} args - Arguments to update one SocialProfile.
     * @example
     * // Update one SocialProfile
     * const socialProfile = await prisma.socialProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocialProfileUpdateArgs>(args: SelectSubset<T, SocialProfileUpdateArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SocialProfiles.
     * @param {SocialProfileDeleteManyArgs} args - Arguments to filter SocialProfiles to delete.
     * @example
     * // Delete a few SocialProfiles
     * const { count } = await prisma.socialProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocialProfileDeleteManyArgs>(args?: SelectSubset<T, SocialProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SocialProfiles
     * const socialProfile = await prisma.socialProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocialProfileUpdateManyArgs>(args: SelectSubset<T, SocialProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SocialProfile.
     * @param {SocialProfileUpsertArgs} args - Arguments to update or create a SocialProfile.
     * @example
     * // Update or create a SocialProfile
     * const socialProfile = await prisma.socialProfile.upsert({
     *   create: {
     *     // ... data to create a SocialProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SocialProfile we want to update
     *   }
     * })
     */
    upsert<T extends SocialProfileUpsertArgs>(args: SelectSubset<T, SocialProfileUpsertArgs<ExtArgs>>): Prisma__SocialProfileClient<$Result.GetResult<Prisma.$SocialProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SocialProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileCountArgs} args - Arguments to filter SocialProfiles to count.
     * @example
     * // Count the number of SocialProfiles
     * const count = await prisma.socialProfile.count({
     *   where: {
     *     // ... the filter for the SocialProfiles we want to count
     *   }
     * })
    **/
    count<T extends SocialProfileCountArgs>(
      args?: Subset<T, SocialProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SocialProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SocialProfileAggregateArgs>(args: Subset<T, SocialProfileAggregateArgs>): Prisma.PrismaPromise<GetSocialProfileAggregateType<T>>

    /**
     * Group by SocialProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SocialProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocialProfileGroupByArgs['orderBy'] }
        : { orderBy?: SocialProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SocialProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SocialProfile model
   */
  readonly fields: SocialProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SocialProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocialProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    influencer<T extends InfluencerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InfluencerDefaultArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SocialProfile model
   */ 
  interface SocialProfileFieldRefs {
    readonly id: FieldRef<"SocialProfile", 'String'>
    readonly platform: FieldRef<"SocialProfile", 'String'>
    readonly handle: FieldRef<"SocialProfile", 'String'>
    readonly url: FieldRef<"SocialProfile", 'String'>
    readonly followers: FieldRef<"SocialProfile", 'Int'>
    readonly createdAt: FieldRef<"SocialProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"SocialProfile", 'DateTime'>
    readonly influencerId: FieldRef<"SocialProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SocialProfile findUnique
   */
  export type SocialProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * Filter, which SocialProfile to fetch.
     */
    where: SocialProfileWhereUniqueInput
  }

  /**
   * SocialProfile findUniqueOrThrow
   */
  export type SocialProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * Filter, which SocialProfile to fetch.
     */
    where: SocialProfileWhereUniqueInput
  }

  /**
   * SocialProfile findFirst
   */
  export type SocialProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * Filter, which SocialProfile to fetch.
     */
    where?: SocialProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialProfiles to fetch.
     */
    orderBy?: SocialProfileOrderByWithRelationInput | SocialProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialProfiles.
     */
    cursor?: SocialProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialProfiles.
     */
    distinct?: SocialProfileScalarFieldEnum | SocialProfileScalarFieldEnum[]
  }

  /**
   * SocialProfile findFirstOrThrow
   */
  export type SocialProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * Filter, which SocialProfile to fetch.
     */
    where?: SocialProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialProfiles to fetch.
     */
    orderBy?: SocialProfileOrderByWithRelationInput | SocialProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialProfiles.
     */
    cursor?: SocialProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialProfiles.
     */
    distinct?: SocialProfileScalarFieldEnum | SocialProfileScalarFieldEnum[]
  }

  /**
   * SocialProfile findMany
   */
  export type SocialProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * Filter, which SocialProfiles to fetch.
     */
    where?: SocialProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialProfiles to fetch.
     */
    orderBy?: SocialProfileOrderByWithRelationInput | SocialProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SocialProfiles.
     */
    cursor?: SocialProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialProfiles.
     */
    skip?: number
    distinct?: SocialProfileScalarFieldEnum | SocialProfileScalarFieldEnum[]
  }

  /**
   * SocialProfile create
   */
  export type SocialProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a SocialProfile.
     */
    data: XOR<SocialProfileCreateInput, SocialProfileUncheckedCreateInput>
  }

  /**
   * SocialProfile createMany
   */
  export type SocialProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SocialProfiles.
     */
    data: SocialProfileCreateManyInput | SocialProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SocialProfile update
   */
  export type SocialProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a SocialProfile.
     */
    data: XOR<SocialProfileUpdateInput, SocialProfileUncheckedUpdateInput>
    /**
     * Choose, which SocialProfile to update.
     */
    where: SocialProfileWhereUniqueInput
  }

  /**
   * SocialProfile updateMany
   */
  export type SocialProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SocialProfiles.
     */
    data: XOR<SocialProfileUpdateManyMutationInput, SocialProfileUncheckedUpdateManyInput>
    /**
     * Filter which SocialProfiles to update
     */
    where?: SocialProfileWhereInput
  }

  /**
   * SocialProfile upsert
   */
  export type SocialProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the SocialProfile to update in case it exists.
     */
    where: SocialProfileWhereUniqueInput
    /**
     * In case the SocialProfile found by the `where` argument doesn't exist, create a new SocialProfile with this data.
     */
    create: XOR<SocialProfileCreateInput, SocialProfileUncheckedCreateInput>
    /**
     * In case the SocialProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocialProfileUpdateInput, SocialProfileUncheckedUpdateInput>
  }

  /**
   * SocialProfile delete
   */
  export type SocialProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
    /**
     * Filter which SocialProfile to delete.
     */
    where: SocialProfileWhereUniqueInput
  }

  /**
   * SocialProfile deleteMany
   */
  export type SocialProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialProfiles to delete
     */
    where?: SocialProfileWhereInput
  }

  /**
   * SocialProfile without action
   */
  export type SocialProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialProfile
     */
    select?: SocialProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialProfileInclude<ExtArgs> | null
  }


  /**
   * Model Content
   */

  export type AggregateContent = {
    _count: ContentCountAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  export type ContentMinAggregateOutputType = {
    id: string | null
    type: string | null
    title: string | null
    body: string | null
    mediaUrl: string | null
    publishDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    influencerId: string | null
    campaignId: string | null
  }

  export type ContentMaxAggregateOutputType = {
    id: string | null
    type: string | null
    title: string | null
    body: string | null
    mediaUrl: string | null
    publishDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    influencerId: string | null
    campaignId: string | null
  }

  export type ContentCountAggregateOutputType = {
    id: number
    type: number
    title: number
    body: number
    mediaUrl: number
    publishDate: number
    status: number
    metrics: number
    createdAt: number
    updatedAt: number
    influencerId: number
    campaignId: number
    _all: number
  }


  export type ContentMinAggregateInputType = {
    id?: true
    type?: true
    title?: true
    body?: true
    mediaUrl?: true
    publishDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    influencerId?: true
    campaignId?: true
  }

  export type ContentMaxAggregateInputType = {
    id?: true
    type?: true
    title?: true
    body?: true
    mediaUrl?: true
    publishDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    influencerId?: true
    campaignId?: true
  }

  export type ContentCountAggregateInputType = {
    id?: true
    type?: true
    title?: true
    body?: true
    mediaUrl?: true
    publishDate?: true
    status?: true
    metrics?: true
    createdAt?: true
    updatedAt?: true
    influencerId?: true
    campaignId?: true
    _all?: true
  }

  export type ContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Content to aggregate.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contents
    **/
    _count?: true | ContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentMaxAggregateInputType
  }

  export type GetContentAggregateType<T extends ContentAggregateArgs> = {
        [P in keyof T & keyof AggregateContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContent[P]>
      : GetScalarType<T[P], AggregateContent[P]>
  }




  export type ContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithAggregationInput | ContentOrderByWithAggregationInput[]
    by: ContentScalarFieldEnum[] | ContentScalarFieldEnum
    having?: ContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentCountAggregateInputType | true
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  }

  export type ContentGroupByOutputType = {
    id: string
    type: string
    title: string | null
    body: string | null
    mediaUrl: string | null
    publishDate: Date | null
    status: string
    metrics: JsonValue | null
    createdAt: Date
    updatedAt: Date
    influencerId: string
    campaignId: string | null
    _count: ContentCountAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  type GetContentGroupByPayload<T extends ContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentGroupByOutputType[P]>
            : GetScalarType<T[P], ContentGroupByOutputType[P]>
        }
      >
    >


  export type ContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    mediaUrl?: boolean
    publishDate?: boolean
    status?: boolean
    metrics?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    influencerId?: boolean
    campaignId?: boolean
    influencer?: boolean | InfluencerDefaultArgs<ExtArgs>
    campaign?: boolean | Content$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>


  export type ContentSelectScalar = {
    id?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    mediaUrl?: boolean
    publishDate?: boolean
    status?: boolean
    metrics?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    influencerId?: boolean
    campaignId?: boolean
  }

  export type ContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    influencer?: boolean | InfluencerDefaultArgs<ExtArgs>
    campaign?: boolean | Content$campaignArgs<ExtArgs>
  }

  export type $ContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Content"
    objects: {
      influencer: Prisma.$InfluencerPayload<ExtArgs>
      campaign: Prisma.$CampaignPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      title: string | null
      body: string | null
      mediaUrl: string | null
      publishDate: Date | null
      status: string
      metrics: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      influencerId: string
      campaignId: string | null
    }, ExtArgs["result"]["content"]>
    composites: {}
  }

  type ContentGetPayload<S extends boolean | null | undefined | ContentDefaultArgs> = $Result.GetResult<Prisma.$ContentPayload, S>

  type ContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContentCountAggregateInputType | true
    }

  export interface ContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Content'], meta: { name: 'Content' } }
    /**
     * Find zero or one Content that matches the filter.
     * @param {ContentFindUniqueArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContentFindUniqueArgs>(args: SelectSubset<T, ContentFindUniqueArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Content that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContentFindUniqueOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContentFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Content that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContentFindFirstArgs>(args?: SelectSubset<T, ContentFindFirstArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Content that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContentFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contents
     * const contents = await prisma.content.findMany()
     * 
     * // Get first 10 Contents
     * const contents = await prisma.content.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contentWithIdOnly = await prisma.content.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContentFindManyArgs>(args?: SelectSubset<T, ContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Content.
     * @param {ContentCreateArgs} args - Arguments to create a Content.
     * @example
     * // Create one Content
     * const Content = await prisma.content.create({
     *   data: {
     *     // ... data to create a Content
     *   }
     * })
     * 
     */
    create<T extends ContentCreateArgs>(args: SelectSubset<T, ContentCreateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contents.
     * @param {ContentCreateManyArgs} args - Arguments to create many Contents.
     * @example
     * // Create many Contents
     * const content = await prisma.content.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContentCreateManyArgs>(args?: SelectSubset<T, ContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Content.
     * @param {ContentDeleteArgs} args - Arguments to delete one Content.
     * @example
     * // Delete one Content
     * const Content = await prisma.content.delete({
     *   where: {
     *     // ... filter to delete one Content
     *   }
     * })
     * 
     */
    delete<T extends ContentDeleteArgs>(args: SelectSubset<T, ContentDeleteArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Content.
     * @param {ContentUpdateArgs} args - Arguments to update one Content.
     * @example
     * // Update one Content
     * const content = await prisma.content.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContentUpdateArgs>(args: SelectSubset<T, ContentUpdateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contents.
     * @param {ContentDeleteManyArgs} args - Arguments to filter Contents to delete.
     * @example
     * // Delete a few Contents
     * const { count } = await prisma.content.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContentDeleteManyArgs>(args?: SelectSubset<T, ContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contents
     * const content = await prisma.content.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContentUpdateManyArgs>(args: SelectSubset<T, ContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Content.
     * @param {ContentUpsertArgs} args - Arguments to update or create a Content.
     * @example
     * // Update or create a Content
     * const content = await prisma.content.upsert({
     *   create: {
     *     // ... data to create a Content
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Content we want to update
     *   }
     * })
     */
    upsert<T extends ContentUpsertArgs>(args: SelectSubset<T, ContentUpsertArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentCountArgs} args - Arguments to filter Contents to count.
     * @example
     * // Count the number of Contents
     * const count = await prisma.content.count({
     *   where: {
     *     // ... the filter for the Contents we want to count
     *   }
     * })
    **/
    count<T extends ContentCountArgs>(
      args?: Subset<T, ContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): Prisma.PrismaPromise<GetContentAggregateType<T>>

    /**
     * Group by Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentGroupByArgs['orderBy'] }
        : { orderBy?: ContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Content model
   */
  readonly fields: ContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Content.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    influencer<T extends InfluencerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InfluencerDefaultArgs<ExtArgs>>): Prisma__InfluencerClient<$Result.GetResult<Prisma.$InfluencerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    campaign<T extends Content$campaignArgs<ExtArgs> = {}>(args?: Subset<T, Content$campaignArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Content model
   */ 
  interface ContentFieldRefs {
    readonly id: FieldRef<"Content", 'String'>
    readonly type: FieldRef<"Content", 'String'>
    readonly title: FieldRef<"Content", 'String'>
    readonly body: FieldRef<"Content", 'String'>
    readonly mediaUrl: FieldRef<"Content", 'String'>
    readonly publishDate: FieldRef<"Content", 'DateTime'>
    readonly status: FieldRef<"Content", 'String'>
    readonly metrics: FieldRef<"Content", 'Json'>
    readonly createdAt: FieldRef<"Content", 'DateTime'>
    readonly updatedAt: FieldRef<"Content", 'DateTime'>
    readonly influencerId: FieldRef<"Content", 'String'>
    readonly campaignId: FieldRef<"Content", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Content findUnique
   */
  export type ContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findUniqueOrThrow
   */
  export type ContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findFirst
   */
  export type ContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findFirstOrThrow
   */
  export type ContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findMany
   */
  export type ContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Contents to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content create
   */
  export type ContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to create a Content.
     */
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  }

  /**
   * Content createMany
   */
  export type ContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contents.
     */
    data: ContentCreateManyInput | ContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Content update
   */
  export type ContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to update a Content.
     */
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    /**
     * Choose, which Content to update.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content updateMany
   */
  export type ContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contents.
     */
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    /**
     * Filter which Contents to update
     */
    where?: ContentWhereInput
  }

  /**
   * Content upsert
   */
  export type ContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The filter to search for the Content to update in case it exists.
     */
    where: ContentWhereUniqueInput
    /**
     * In case the Content found by the `where` argument doesn't exist, create a new Content with this data.
     */
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    /**
     * In case the Content was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  }

  /**
   * Content delete
   */
  export type ContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter which Content to delete.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content deleteMany
   */
  export type ContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contents to delete
     */
    where?: ContentWhereInput
  }

  /**
   * Content.campaign
   */
  export type Content$campaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
  }

  /**
   * Content without action
   */
  export type ContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const InfluencerScalarFieldEnum: {
    id: 'id',
    handle: 'handle',
    name: 'name',
    bio: 'bio',
    image: 'image',
    category: 'category',
    followers: 'followers',
    engagementRate: 'engagementRate',
    posts: 'posts',
    verified: 'verified',
    featured: 'featured',
    tagType: 'tagType',
    email: 'email',
    phone: 'phone',
    location: 'location',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InfluencerScalarFieldEnum = (typeof InfluencerScalarFieldEnum)[keyof typeof InfluencerScalarFieldEnum]


  export const BrandScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logo: 'logo',
    industry: 'industry',
    website: 'website',
    description: 'description',
    contactName: 'contactName',
    contactEmail: 'contactEmail',
    contactPhone: 'contactPhone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    budget: 'budget',
    startDate: 'startDate',
    endDate: 'endDate',
    requirements: 'requirements',
    goals: 'goals',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    brandId: 'brandId'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const SponsorshipScalarFieldEnum: {
    id: 'id',
    startDate: 'startDate',
    endDate: 'endDate',
    terms: 'terms',
    compensation: 'compensation',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    brandId: 'brandId',
    influencerId: 'influencerId'
  };

  export type SponsorshipScalarFieldEnum = (typeof SponsorshipScalarFieldEnum)[keyof typeof SponsorshipScalarFieldEnum]


  export const SocialProfileScalarFieldEnum: {
    id: 'id',
    platform: 'platform',
    handle: 'handle',
    url: 'url',
    followers: 'followers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    influencerId: 'influencerId'
  };

  export type SocialProfileScalarFieldEnum = (typeof SocialProfileScalarFieldEnum)[keyof typeof SocialProfileScalarFieldEnum]


  export const ContentScalarFieldEnum: {
    id: 'id',
    type: 'type',
    title: 'title',
    body: 'body',
    mediaUrl: 'mediaUrl',
    publishDate: 'publishDate',
    status: 'status',
    metrics: 'metrics',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    influencerId: 'influencerId',
    campaignId: 'campaignId'
  };

  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type InfluencerWhereInput = {
    AND?: InfluencerWhereInput | InfluencerWhereInput[]
    OR?: InfluencerWhereInput[]
    NOT?: InfluencerWhereInput | InfluencerWhereInput[]
    id?: StringFilter<"Influencer"> | string
    handle?: StringFilter<"Influencer"> | string
    name?: StringFilter<"Influencer"> | string
    bio?: StringNullableFilter<"Influencer"> | string | null
    image?: StringNullableFilter<"Influencer"> | string | null
    category?: StringNullableFilter<"Influencer"> | string | null
    followers?: IntFilter<"Influencer"> | number
    engagementRate?: FloatNullableFilter<"Influencer"> | number | null
    posts?: IntNullableFilter<"Influencer"> | number | null
    verified?: BoolFilter<"Influencer"> | boolean
    featured?: BoolFilter<"Influencer"> | boolean
    tagType?: StringNullableFilter<"Influencer"> | string | null
    email?: StringNullableFilter<"Influencer"> | string | null
    phone?: StringNullableFilter<"Influencer"> | string | null
    location?: StringNullableFilter<"Influencer"> | string | null
    tags?: JsonNullableFilter<"Influencer">
    createdAt?: DateTimeFilter<"Influencer"> | Date | string
    updatedAt?: DateTimeFilter<"Influencer"> | Date | string
    socialProfiles?: SocialProfileListRelationFilter
    campaigns?: CampaignListRelationFilter
    sponsorships?: SponsorshipListRelationFilter
    content?: ContentListRelationFilter
  }

  export type InfluencerOrderByWithRelationInput = {
    id?: SortOrder
    handle?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    followers?: SortOrder
    engagementRate?: SortOrderInput | SortOrder
    posts?: SortOrderInput | SortOrder
    verified?: SortOrder
    featured?: SortOrder
    tagType?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    socialProfiles?: SocialProfileOrderByRelationAggregateInput
    campaigns?: CampaignOrderByRelationAggregateInput
    sponsorships?: SponsorshipOrderByRelationAggregateInput
    content?: ContentOrderByRelationAggregateInput
  }

  export type InfluencerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    handle?: string
    AND?: InfluencerWhereInput | InfluencerWhereInput[]
    OR?: InfluencerWhereInput[]
    NOT?: InfluencerWhereInput | InfluencerWhereInput[]
    name?: StringFilter<"Influencer"> | string
    bio?: StringNullableFilter<"Influencer"> | string | null
    image?: StringNullableFilter<"Influencer"> | string | null
    category?: StringNullableFilter<"Influencer"> | string | null
    followers?: IntFilter<"Influencer"> | number
    engagementRate?: FloatNullableFilter<"Influencer"> | number | null
    posts?: IntNullableFilter<"Influencer"> | number | null
    verified?: BoolFilter<"Influencer"> | boolean
    featured?: BoolFilter<"Influencer"> | boolean
    tagType?: StringNullableFilter<"Influencer"> | string | null
    email?: StringNullableFilter<"Influencer"> | string | null
    phone?: StringNullableFilter<"Influencer"> | string | null
    location?: StringNullableFilter<"Influencer"> | string | null
    tags?: JsonNullableFilter<"Influencer">
    createdAt?: DateTimeFilter<"Influencer"> | Date | string
    updatedAt?: DateTimeFilter<"Influencer"> | Date | string
    socialProfiles?: SocialProfileListRelationFilter
    campaigns?: CampaignListRelationFilter
    sponsorships?: SponsorshipListRelationFilter
    content?: ContentListRelationFilter
  }, "id" | "handle">

  export type InfluencerOrderByWithAggregationInput = {
    id?: SortOrder
    handle?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    followers?: SortOrder
    engagementRate?: SortOrderInput | SortOrder
    posts?: SortOrderInput | SortOrder
    verified?: SortOrder
    featured?: SortOrder
    tagType?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InfluencerCountOrderByAggregateInput
    _avg?: InfluencerAvgOrderByAggregateInput
    _max?: InfluencerMaxOrderByAggregateInput
    _min?: InfluencerMinOrderByAggregateInput
    _sum?: InfluencerSumOrderByAggregateInput
  }

  export type InfluencerScalarWhereWithAggregatesInput = {
    AND?: InfluencerScalarWhereWithAggregatesInput | InfluencerScalarWhereWithAggregatesInput[]
    OR?: InfluencerScalarWhereWithAggregatesInput[]
    NOT?: InfluencerScalarWhereWithAggregatesInput | InfluencerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Influencer"> | string
    handle?: StringWithAggregatesFilter<"Influencer"> | string
    name?: StringWithAggregatesFilter<"Influencer"> | string
    bio?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    image?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    category?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    followers?: IntWithAggregatesFilter<"Influencer"> | number
    engagementRate?: FloatNullableWithAggregatesFilter<"Influencer"> | number | null
    posts?: IntNullableWithAggregatesFilter<"Influencer"> | number | null
    verified?: BoolWithAggregatesFilter<"Influencer"> | boolean
    featured?: BoolWithAggregatesFilter<"Influencer"> | boolean
    tagType?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    location?: StringNullableWithAggregatesFilter<"Influencer"> | string | null
    tags?: JsonNullableWithAggregatesFilter<"Influencer">
    createdAt?: DateTimeWithAggregatesFilter<"Influencer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Influencer"> | Date | string
  }

  export type BrandWhereInput = {
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    id?: StringFilter<"Brand"> | string
    name?: StringFilter<"Brand"> | string
    logo?: StringNullableFilter<"Brand"> | string | null
    industry?: StringNullableFilter<"Brand"> | string | null
    website?: StringNullableFilter<"Brand"> | string | null
    description?: StringNullableFilter<"Brand"> | string | null
    contactName?: StringNullableFilter<"Brand"> | string | null
    contactEmail?: StringNullableFilter<"Brand"> | string | null
    contactPhone?: StringNullableFilter<"Brand"> | string | null
    createdAt?: DateTimeFilter<"Brand"> | Date | string
    updatedAt?: DateTimeFilter<"Brand"> | Date | string
    campaigns?: CampaignListRelationFilter
    sponsorships?: SponsorshipListRelationFilter
  }

  export type BrandOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    contactName?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaigns?: CampaignOrderByRelationAggregateInput
    sponsorships?: SponsorshipOrderByRelationAggregateInput
  }

  export type BrandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    name?: StringFilter<"Brand"> | string
    logo?: StringNullableFilter<"Brand"> | string | null
    industry?: StringNullableFilter<"Brand"> | string | null
    website?: StringNullableFilter<"Brand"> | string | null
    description?: StringNullableFilter<"Brand"> | string | null
    contactName?: StringNullableFilter<"Brand"> | string | null
    contactEmail?: StringNullableFilter<"Brand"> | string | null
    contactPhone?: StringNullableFilter<"Brand"> | string | null
    createdAt?: DateTimeFilter<"Brand"> | Date | string
    updatedAt?: DateTimeFilter<"Brand"> | Date | string
    campaigns?: CampaignListRelationFilter
    sponsorships?: SponsorshipListRelationFilter
  }, "id">

  export type BrandOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    contactName?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    OR?: BrandScalarWhereWithAggregatesInput[]
    NOT?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Brand"> | string
    name?: StringWithAggregatesFilter<"Brand"> | string
    logo?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    website?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    description?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    contactName?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    contactEmail?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    contactPhone?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Brand"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Brand"> | Date | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    status?: StringFilter<"Campaign"> | string
    budget?: FloatNullableFilter<"Campaign"> | number | null
    startDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    requirements?: StringNullableFilter<"Campaign"> | string | null
    goals?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    brandId?: StringFilter<"Campaign"> | string
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
    influencers?: InfluencerListRelationFilter
    content?: ContentListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    budget?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    requirements?: SortOrderInput | SortOrder
    goals?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    brand?: BrandOrderByWithRelationInput
    influencers?: InfluencerOrderByRelationAggregateInput
    content?: ContentOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    status?: StringFilter<"Campaign"> | string
    budget?: FloatNullableFilter<"Campaign"> | number | null
    startDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    requirements?: StringNullableFilter<"Campaign"> | string | null
    goals?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    brandId?: StringFilter<"Campaign"> | string
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
    influencers?: InfluencerListRelationFilter
    content?: ContentListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    budget?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    requirements?: SortOrderInput | SortOrder
    goals?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _avg?: CampaignAvgOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
    _sum?: CampaignSumOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    description?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    status?: StringWithAggregatesFilter<"Campaign"> | string
    budget?: FloatNullableWithAggregatesFilter<"Campaign"> | number | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
    requirements?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    goals?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    brandId?: StringWithAggregatesFilter<"Campaign"> | string
  }

  export type SponsorshipWhereInput = {
    AND?: SponsorshipWhereInput | SponsorshipWhereInput[]
    OR?: SponsorshipWhereInput[]
    NOT?: SponsorshipWhereInput | SponsorshipWhereInput[]
    id?: StringFilter<"Sponsorship"> | string
    startDate?: DateTimeFilter<"Sponsorship"> | Date | string
    endDate?: DateTimeFilter<"Sponsorship"> | Date | string
    terms?: StringNullableFilter<"Sponsorship"> | string | null
    compensation?: FloatNullableFilter<"Sponsorship"> | number | null
    status?: StringFilter<"Sponsorship"> | string
    createdAt?: DateTimeFilter<"Sponsorship"> | Date | string
    updatedAt?: DateTimeFilter<"Sponsorship"> | Date | string
    brandId?: StringFilter<"Sponsorship"> | string
    influencerId?: StringFilter<"Sponsorship"> | string
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
    influencer?: XOR<InfluencerRelationFilter, InfluencerWhereInput>
  }

  export type SponsorshipOrderByWithRelationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    terms?: SortOrderInput | SortOrder
    compensation?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    influencerId?: SortOrder
    brand?: BrandOrderByWithRelationInput
    influencer?: InfluencerOrderByWithRelationInput
  }

  export type SponsorshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SponsorshipWhereInput | SponsorshipWhereInput[]
    OR?: SponsorshipWhereInput[]
    NOT?: SponsorshipWhereInput | SponsorshipWhereInput[]
    startDate?: DateTimeFilter<"Sponsorship"> | Date | string
    endDate?: DateTimeFilter<"Sponsorship"> | Date | string
    terms?: StringNullableFilter<"Sponsorship"> | string | null
    compensation?: FloatNullableFilter<"Sponsorship"> | number | null
    status?: StringFilter<"Sponsorship"> | string
    createdAt?: DateTimeFilter<"Sponsorship"> | Date | string
    updatedAt?: DateTimeFilter<"Sponsorship"> | Date | string
    brandId?: StringFilter<"Sponsorship"> | string
    influencerId?: StringFilter<"Sponsorship"> | string
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
    influencer?: XOR<InfluencerRelationFilter, InfluencerWhereInput>
  }, "id">

  export type SponsorshipOrderByWithAggregationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    terms?: SortOrderInput | SortOrder
    compensation?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    influencerId?: SortOrder
    _count?: SponsorshipCountOrderByAggregateInput
    _avg?: SponsorshipAvgOrderByAggregateInput
    _max?: SponsorshipMaxOrderByAggregateInput
    _min?: SponsorshipMinOrderByAggregateInput
    _sum?: SponsorshipSumOrderByAggregateInput
  }

  export type SponsorshipScalarWhereWithAggregatesInput = {
    AND?: SponsorshipScalarWhereWithAggregatesInput | SponsorshipScalarWhereWithAggregatesInput[]
    OR?: SponsorshipScalarWhereWithAggregatesInput[]
    NOT?: SponsorshipScalarWhereWithAggregatesInput | SponsorshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sponsorship"> | string
    startDate?: DateTimeWithAggregatesFilter<"Sponsorship"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Sponsorship"> | Date | string
    terms?: StringNullableWithAggregatesFilter<"Sponsorship"> | string | null
    compensation?: FloatNullableWithAggregatesFilter<"Sponsorship"> | number | null
    status?: StringWithAggregatesFilter<"Sponsorship"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sponsorship"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sponsorship"> | Date | string
    brandId?: StringWithAggregatesFilter<"Sponsorship"> | string
    influencerId?: StringWithAggregatesFilter<"Sponsorship"> | string
  }

  export type SocialProfileWhereInput = {
    AND?: SocialProfileWhereInput | SocialProfileWhereInput[]
    OR?: SocialProfileWhereInput[]
    NOT?: SocialProfileWhereInput | SocialProfileWhereInput[]
    id?: StringFilter<"SocialProfile"> | string
    platform?: StringFilter<"SocialProfile"> | string
    handle?: StringFilter<"SocialProfile"> | string
    url?: StringNullableFilter<"SocialProfile"> | string | null
    followers?: IntNullableFilter<"SocialProfile"> | number | null
    createdAt?: DateTimeFilter<"SocialProfile"> | Date | string
    updatedAt?: DateTimeFilter<"SocialProfile"> | Date | string
    influencerId?: StringFilter<"SocialProfile"> | string
    influencer?: XOR<InfluencerRelationFilter, InfluencerWhereInput>
  }

  export type SocialProfileOrderByWithRelationInput = {
    id?: SortOrder
    platform?: SortOrder
    handle?: SortOrder
    url?: SortOrderInput | SortOrder
    followers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    influencer?: InfluencerOrderByWithRelationInput
  }

  export type SocialProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SocialProfileWhereInput | SocialProfileWhereInput[]
    OR?: SocialProfileWhereInput[]
    NOT?: SocialProfileWhereInput | SocialProfileWhereInput[]
    platform?: StringFilter<"SocialProfile"> | string
    handle?: StringFilter<"SocialProfile"> | string
    url?: StringNullableFilter<"SocialProfile"> | string | null
    followers?: IntNullableFilter<"SocialProfile"> | number | null
    createdAt?: DateTimeFilter<"SocialProfile"> | Date | string
    updatedAt?: DateTimeFilter<"SocialProfile"> | Date | string
    influencerId?: StringFilter<"SocialProfile"> | string
    influencer?: XOR<InfluencerRelationFilter, InfluencerWhereInput>
  }, "id">

  export type SocialProfileOrderByWithAggregationInput = {
    id?: SortOrder
    platform?: SortOrder
    handle?: SortOrder
    url?: SortOrderInput | SortOrder
    followers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    _count?: SocialProfileCountOrderByAggregateInput
    _avg?: SocialProfileAvgOrderByAggregateInput
    _max?: SocialProfileMaxOrderByAggregateInput
    _min?: SocialProfileMinOrderByAggregateInput
    _sum?: SocialProfileSumOrderByAggregateInput
  }

  export type SocialProfileScalarWhereWithAggregatesInput = {
    AND?: SocialProfileScalarWhereWithAggregatesInput | SocialProfileScalarWhereWithAggregatesInput[]
    OR?: SocialProfileScalarWhereWithAggregatesInput[]
    NOT?: SocialProfileScalarWhereWithAggregatesInput | SocialProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SocialProfile"> | string
    platform?: StringWithAggregatesFilter<"SocialProfile"> | string
    handle?: StringWithAggregatesFilter<"SocialProfile"> | string
    url?: StringNullableWithAggregatesFilter<"SocialProfile"> | string | null
    followers?: IntNullableWithAggregatesFilter<"SocialProfile"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SocialProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SocialProfile"> | Date | string
    influencerId?: StringWithAggregatesFilter<"SocialProfile"> | string
  }

  export type ContentWhereInput = {
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    id?: StringFilter<"Content"> | string
    type?: StringFilter<"Content"> | string
    title?: StringNullableFilter<"Content"> | string | null
    body?: StringNullableFilter<"Content"> | string | null
    mediaUrl?: StringNullableFilter<"Content"> | string | null
    publishDate?: DateTimeNullableFilter<"Content"> | Date | string | null
    status?: StringFilter<"Content"> | string
    metrics?: JsonNullableFilter<"Content">
    createdAt?: DateTimeFilter<"Content"> | Date | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    influencerId?: StringFilter<"Content"> | string
    campaignId?: StringNullableFilter<"Content"> | string | null
    influencer?: XOR<InfluencerRelationFilter, InfluencerWhereInput>
    campaign?: XOR<CampaignNullableRelationFilter, CampaignWhereInput> | null
  }

  export type ContentOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    publishDate?: SortOrderInput | SortOrder
    status?: SortOrder
    metrics?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrderInput | SortOrder
    influencer?: InfluencerOrderByWithRelationInput
    campaign?: CampaignOrderByWithRelationInput
  }

  export type ContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    type?: StringFilter<"Content"> | string
    title?: StringNullableFilter<"Content"> | string | null
    body?: StringNullableFilter<"Content"> | string | null
    mediaUrl?: StringNullableFilter<"Content"> | string | null
    publishDate?: DateTimeNullableFilter<"Content"> | Date | string | null
    status?: StringFilter<"Content"> | string
    metrics?: JsonNullableFilter<"Content">
    createdAt?: DateTimeFilter<"Content"> | Date | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    influencerId?: StringFilter<"Content"> | string
    campaignId?: StringNullableFilter<"Content"> | string | null
    influencer?: XOR<InfluencerRelationFilter, InfluencerWhereInput>
    campaign?: XOR<CampaignNullableRelationFilter, CampaignWhereInput> | null
  }, "id">

  export type ContentOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    publishDate?: SortOrderInput | SortOrder
    status?: SortOrder
    metrics?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrderInput | SortOrder
    _count?: ContentCountOrderByAggregateInput
    _max?: ContentMaxOrderByAggregateInput
    _min?: ContentMinOrderByAggregateInput
  }

  export type ContentScalarWhereWithAggregatesInput = {
    AND?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    OR?: ContentScalarWhereWithAggregatesInput[]
    NOT?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Content"> | string
    type?: StringWithAggregatesFilter<"Content"> | string
    title?: StringNullableWithAggregatesFilter<"Content"> | string | null
    body?: StringNullableWithAggregatesFilter<"Content"> | string | null
    mediaUrl?: StringNullableWithAggregatesFilter<"Content"> | string | null
    publishDate?: DateTimeNullableWithAggregatesFilter<"Content"> | Date | string | null
    status?: StringWithAggregatesFilter<"Content"> | string
    metrics?: JsonNullableWithAggregatesFilter<"Content">
    createdAt?: DateTimeWithAggregatesFilter<"Content"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Content"> | Date | string
    influencerId?: StringWithAggregatesFilter<"Content"> | string
    campaignId?: StringNullableWithAggregatesFilter<"Content"> | string | null
  }

  export type InfluencerCreateInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileCreateNestedManyWithoutInfluencerInput
    campaigns?: CampaignCreateNestedManyWithoutInfluencersInput
    sponsorships?: SponsorshipCreateNestedManyWithoutInfluencerInput
    content?: ContentCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerUncheckedCreateInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileUncheckedCreateNestedManyWithoutInfluencerInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutInfluencersInput
    sponsorships?: SponsorshipUncheckedCreateNestedManyWithoutInfluencerInput
    content?: ContentUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUpdateManyWithoutInfluencerNestedInput
    campaigns?: CampaignUpdateManyWithoutInfluencersNestedInput
    sponsorships?: SponsorshipUpdateManyWithoutInfluencerNestedInput
    content?: ContentUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUncheckedUpdateManyWithoutInfluencerNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutInfluencersNestedInput
    sponsorships?: SponsorshipUncheckedUpdateManyWithoutInfluencerNestedInput
    content?: ContentUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerCreateManyInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InfluencerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InfluencerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandCreateInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignCreateNestedManyWithoutBrandInput
    sponsorships?: SponsorshipCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignUncheckedCreateNestedManyWithoutBrandInput
    sponsorships?: SponsorshipUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUpdateManyWithoutBrandNestedInput
    sponsorships?: SponsorshipUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUncheckedUpdateManyWithoutBrandNestedInput
    sponsorships?: SponsorshipUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutCampaignsInput
    influencers?: InfluencerCreateNestedManyWithoutCampaignsInput
    content?: ContentCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
    influencers?: InfluencerUncheckedCreateNestedManyWithoutCampaignsInput
    content?: ContentUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutCampaignsNestedInput
    influencers?: InfluencerUpdateManyWithoutCampaignsNestedInput
    content?: ContentUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
    influencers?: InfluencerUncheckedUpdateManyWithoutCampaignsNestedInput
    content?: ContentUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
  }

  export type SponsorshipCreateInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutSponsorshipsInput
    influencer: InfluencerCreateNestedOneWithoutSponsorshipsInput
  }

  export type SponsorshipUncheckedCreateInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
    influencerId: string
  }

  export type SponsorshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutSponsorshipsNestedInput
    influencer?: InfluencerUpdateOneRequiredWithoutSponsorshipsNestedInput
  }

  export type SponsorshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type SponsorshipCreateManyInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
    influencerId: string
  }

  export type SponsorshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SponsorshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialProfileCreateInput = {
    id?: string
    platform: string
    handle: string
    url?: string | null
    followers?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: InfluencerCreateNestedOneWithoutSocialProfilesInput
  }

  export type SocialProfileUncheckedCreateInput = {
    id?: string
    platform: string
    handle: string
    url?: string | null
    followers?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
  }

  export type SocialProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: InfluencerUpdateOneRequiredWithoutSocialProfilesNestedInput
  }

  export type SocialProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialProfileCreateManyInput = {
    id?: string
    platform: string
    handle: string
    url?: string | null
    followers?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
  }

  export type SocialProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: InfluencerCreateNestedOneWithoutContentInput
    campaign?: CampaignCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
    campaignId?: string | null
  }

  export type ContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: InfluencerUpdateOneRequiredWithoutContentNestedInput
    campaign?: CampaignUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContentCreateManyInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
    campaignId?: string | null
  }

  export type ContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SocialProfileListRelationFilter = {
    every?: SocialProfileWhereInput
    some?: SocialProfileWhereInput
    none?: SocialProfileWhereInput
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type SponsorshipListRelationFilter = {
    every?: SponsorshipWhereInput
    some?: SponsorshipWhereInput
    none?: SponsorshipWhereInput
  }

  export type ContentListRelationFilter = {
    every?: ContentWhereInput
    some?: ContentWhereInput
    none?: ContentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SocialProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SponsorshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InfluencerCountOrderByAggregateInput = {
    id?: SortOrder
    handle?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    image?: SortOrder
    category?: SortOrder
    followers?: SortOrder
    engagementRate?: SortOrder
    posts?: SortOrder
    verified?: SortOrder
    featured?: SortOrder
    tagType?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InfluencerAvgOrderByAggregateInput = {
    followers?: SortOrder
    engagementRate?: SortOrder
    posts?: SortOrder
  }

  export type InfluencerMaxOrderByAggregateInput = {
    id?: SortOrder
    handle?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    image?: SortOrder
    category?: SortOrder
    followers?: SortOrder
    engagementRate?: SortOrder
    posts?: SortOrder
    verified?: SortOrder
    featured?: SortOrder
    tagType?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InfluencerMinOrderByAggregateInput = {
    id?: SortOrder
    handle?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    image?: SortOrder
    category?: SortOrder
    followers?: SortOrder
    engagementRate?: SortOrder
    posts?: SortOrder
    verified?: SortOrder
    featured?: SortOrder
    tagType?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InfluencerSumOrderByAggregateInput = {
    followers?: SortOrder
    engagementRate?: SortOrder
    posts?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BrandCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    description?: SortOrder
    contactName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    description?: SortOrder
    contactName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    description?: SortOrder
    contactName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BrandRelationFilter = {
    is?: BrandWhereInput
    isNot?: BrandWhereInput
  }

  export type InfluencerListRelationFilter = {
    every?: InfluencerWhereInput
    some?: InfluencerWhereInput
    none?: InfluencerWhereInput
  }

  export type InfluencerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requirements?: SortOrder
    goals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
  }

  export type CampaignAvgOrderByAggregateInput = {
    budget?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requirements?: SortOrder
    goals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requirements?: SortOrder
    goals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
  }

  export type CampaignSumOrderByAggregateInput = {
    budget?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InfluencerRelationFilter = {
    is?: InfluencerWhereInput
    isNot?: InfluencerWhereInput
  }

  export type SponsorshipCountOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    terms?: SortOrder
    compensation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    influencerId?: SortOrder
  }

  export type SponsorshipAvgOrderByAggregateInput = {
    compensation?: SortOrder
  }

  export type SponsorshipMaxOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    terms?: SortOrder
    compensation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    influencerId?: SortOrder
  }

  export type SponsorshipMinOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    terms?: SortOrder
    compensation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brandId?: SortOrder
    influencerId?: SortOrder
  }

  export type SponsorshipSumOrderByAggregateInput = {
    compensation?: SortOrder
  }

  export type SocialProfileCountOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    handle?: SortOrder
    url?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
  }

  export type SocialProfileAvgOrderByAggregateInput = {
    followers?: SortOrder
  }

  export type SocialProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    handle?: SortOrder
    url?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
  }

  export type SocialProfileMinOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    handle?: SortOrder
    url?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
  }

  export type SocialProfileSumOrderByAggregateInput = {
    followers?: SortOrder
  }

  export type CampaignNullableRelationFilter = {
    is?: CampaignWhereInput | null
    isNot?: CampaignWhereInput | null
  }

  export type ContentCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    mediaUrl?: SortOrder
    publishDate?: SortOrder
    status?: SortOrder
    metrics?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
  }

  export type ContentMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    mediaUrl?: SortOrder
    publishDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
  }

  export type ContentMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    mediaUrl?: SortOrder
    publishDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
  }

  export type SocialProfileCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<SocialProfileCreateWithoutInfluencerInput, SocialProfileUncheckedCreateWithoutInfluencerInput> | SocialProfileCreateWithoutInfluencerInput[] | SocialProfileUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SocialProfileCreateOrConnectWithoutInfluencerInput | SocialProfileCreateOrConnectWithoutInfluencerInput[]
    createMany?: SocialProfileCreateManyInfluencerInputEnvelope
    connect?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutInfluencersInput = {
    create?: XOR<CampaignCreateWithoutInfluencersInput, CampaignUncheckedCreateWithoutInfluencersInput> | CampaignCreateWithoutInfluencersInput[] | CampaignUncheckedCreateWithoutInfluencersInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutInfluencersInput | CampaignCreateOrConnectWithoutInfluencersInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type SponsorshipCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<SponsorshipCreateWithoutInfluencerInput, SponsorshipUncheckedCreateWithoutInfluencerInput> | SponsorshipCreateWithoutInfluencerInput[] | SponsorshipUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutInfluencerInput | SponsorshipCreateOrConnectWithoutInfluencerInput[]
    createMany?: SponsorshipCreateManyInfluencerInputEnvelope
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
  }

  export type ContentCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<ContentCreateWithoutInfluencerInput, ContentUncheckedCreateWithoutInfluencerInput> | ContentCreateWithoutInfluencerInput[] | ContentUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutInfluencerInput | ContentCreateOrConnectWithoutInfluencerInput[]
    createMany?: ContentCreateManyInfluencerInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  }

  export type SocialProfileUncheckedCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<SocialProfileCreateWithoutInfluencerInput, SocialProfileUncheckedCreateWithoutInfluencerInput> | SocialProfileCreateWithoutInfluencerInput[] | SocialProfileUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SocialProfileCreateOrConnectWithoutInfluencerInput | SocialProfileCreateOrConnectWithoutInfluencerInput[]
    createMany?: SocialProfileCreateManyInfluencerInputEnvelope
    connect?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutInfluencersInput = {
    create?: XOR<CampaignCreateWithoutInfluencersInput, CampaignUncheckedCreateWithoutInfluencersInput> | CampaignCreateWithoutInfluencersInput[] | CampaignUncheckedCreateWithoutInfluencersInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutInfluencersInput | CampaignCreateOrConnectWithoutInfluencersInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type SponsorshipUncheckedCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<SponsorshipCreateWithoutInfluencerInput, SponsorshipUncheckedCreateWithoutInfluencerInput> | SponsorshipCreateWithoutInfluencerInput[] | SponsorshipUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutInfluencerInput | SponsorshipCreateOrConnectWithoutInfluencerInput[]
    createMany?: SponsorshipCreateManyInfluencerInputEnvelope
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
  }

  export type ContentUncheckedCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<ContentCreateWithoutInfluencerInput, ContentUncheckedCreateWithoutInfluencerInput> | ContentCreateWithoutInfluencerInput[] | ContentUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutInfluencerInput | ContentCreateOrConnectWithoutInfluencerInput[]
    createMany?: ContentCreateManyInfluencerInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SocialProfileUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<SocialProfileCreateWithoutInfluencerInput, SocialProfileUncheckedCreateWithoutInfluencerInput> | SocialProfileCreateWithoutInfluencerInput[] | SocialProfileUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SocialProfileCreateOrConnectWithoutInfluencerInput | SocialProfileCreateOrConnectWithoutInfluencerInput[]
    upsert?: SocialProfileUpsertWithWhereUniqueWithoutInfluencerInput | SocialProfileUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: SocialProfileCreateManyInfluencerInputEnvelope
    set?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    disconnect?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    delete?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    connect?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    update?: SocialProfileUpdateWithWhereUniqueWithoutInfluencerInput | SocialProfileUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: SocialProfileUpdateManyWithWhereWithoutInfluencerInput | SocialProfileUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: SocialProfileScalarWhereInput | SocialProfileScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutInfluencersNestedInput = {
    create?: XOR<CampaignCreateWithoutInfluencersInput, CampaignUncheckedCreateWithoutInfluencersInput> | CampaignCreateWithoutInfluencersInput[] | CampaignUncheckedCreateWithoutInfluencersInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutInfluencersInput | CampaignCreateOrConnectWithoutInfluencersInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutInfluencersInput | CampaignUpsertWithWhereUniqueWithoutInfluencersInput[]
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutInfluencersInput | CampaignUpdateWithWhereUniqueWithoutInfluencersInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutInfluencersInput | CampaignUpdateManyWithWhereWithoutInfluencersInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type SponsorshipUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<SponsorshipCreateWithoutInfluencerInput, SponsorshipUncheckedCreateWithoutInfluencerInput> | SponsorshipCreateWithoutInfluencerInput[] | SponsorshipUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutInfluencerInput | SponsorshipCreateOrConnectWithoutInfluencerInput[]
    upsert?: SponsorshipUpsertWithWhereUniqueWithoutInfluencerInput | SponsorshipUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: SponsorshipCreateManyInfluencerInputEnvelope
    set?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    disconnect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    delete?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    update?: SponsorshipUpdateWithWhereUniqueWithoutInfluencerInput | SponsorshipUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: SponsorshipUpdateManyWithWhereWithoutInfluencerInput | SponsorshipUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: SponsorshipScalarWhereInput | SponsorshipScalarWhereInput[]
  }

  export type ContentUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<ContentCreateWithoutInfluencerInput, ContentUncheckedCreateWithoutInfluencerInput> | ContentCreateWithoutInfluencerInput[] | ContentUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutInfluencerInput | ContentCreateOrConnectWithoutInfluencerInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutInfluencerInput | ContentUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: ContentCreateManyInfluencerInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutInfluencerInput | ContentUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutInfluencerInput | ContentUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  }

  export type SocialProfileUncheckedUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<SocialProfileCreateWithoutInfluencerInput, SocialProfileUncheckedCreateWithoutInfluencerInput> | SocialProfileCreateWithoutInfluencerInput[] | SocialProfileUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SocialProfileCreateOrConnectWithoutInfluencerInput | SocialProfileCreateOrConnectWithoutInfluencerInput[]
    upsert?: SocialProfileUpsertWithWhereUniqueWithoutInfluencerInput | SocialProfileUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: SocialProfileCreateManyInfluencerInputEnvelope
    set?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    disconnect?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    delete?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    connect?: SocialProfileWhereUniqueInput | SocialProfileWhereUniqueInput[]
    update?: SocialProfileUpdateWithWhereUniqueWithoutInfluencerInput | SocialProfileUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: SocialProfileUpdateManyWithWhereWithoutInfluencerInput | SocialProfileUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: SocialProfileScalarWhereInput | SocialProfileScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutInfluencersNestedInput = {
    create?: XOR<CampaignCreateWithoutInfluencersInput, CampaignUncheckedCreateWithoutInfluencersInput> | CampaignCreateWithoutInfluencersInput[] | CampaignUncheckedCreateWithoutInfluencersInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutInfluencersInput | CampaignCreateOrConnectWithoutInfluencersInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutInfluencersInput | CampaignUpsertWithWhereUniqueWithoutInfluencersInput[]
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutInfluencersInput | CampaignUpdateWithWhereUniqueWithoutInfluencersInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutInfluencersInput | CampaignUpdateManyWithWhereWithoutInfluencersInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type SponsorshipUncheckedUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<SponsorshipCreateWithoutInfluencerInput, SponsorshipUncheckedCreateWithoutInfluencerInput> | SponsorshipCreateWithoutInfluencerInput[] | SponsorshipUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutInfluencerInput | SponsorshipCreateOrConnectWithoutInfluencerInput[]
    upsert?: SponsorshipUpsertWithWhereUniqueWithoutInfluencerInput | SponsorshipUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: SponsorshipCreateManyInfluencerInputEnvelope
    set?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    disconnect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    delete?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    update?: SponsorshipUpdateWithWhereUniqueWithoutInfluencerInput | SponsorshipUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: SponsorshipUpdateManyWithWhereWithoutInfluencerInput | SponsorshipUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: SponsorshipScalarWhereInput | SponsorshipScalarWhereInput[]
  }

  export type ContentUncheckedUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<ContentCreateWithoutInfluencerInput, ContentUncheckedCreateWithoutInfluencerInput> | ContentCreateWithoutInfluencerInput[] | ContentUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutInfluencerInput | ContentCreateOrConnectWithoutInfluencerInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutInfluencerInput | ContentUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: ContentCreateManyInfluencerInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutInfluencerInput | ContentUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutInfluencerInput | ContentUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  }

  export type CampaignCreateNestedManyWithoutBrandInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type SponsorshipCreateNestedManyWithoutBrandInput = {
    create?: XOR<SponsorshipCreateWithoutBrandInput, SponsorshipUncheckedCreateWithoutBrandInput> | SponsorshipCreateWithoutBrandInput[] | SponsorshipUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutBrandInput | SponsorshipCreateOrConnectWithoutBrandInput[]
    createMany?: SponsorshipCreateManyBrandInputEnvelope
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type SponsorshipUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<SponsorshipCreateWithoutBrandInput, SponsorshipUncheckedCreateWithoutBrandInput> | SponsorshipCreateWithoutBrandInput[] | SponsorshipUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutBrandInput | SponsorshipCreateOrConnectWithoutBrandInput[]
    createMany?: SponsorshipCreateManyBrandInputEnvelope
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
  }

  export type CampaignUpdateManyWithoutBrandNestedInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutBrandInput | CampaignUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutBrandInput | CampaignUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutBrandInput | CampaignUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type SponsorshipUpdateManyWithoutBrandNestedInput = {
    create?: XOR<SponsorshipCreateWithoutBrandInput, SponsorshipUncheckedCreateWithoutBrandInput> | SponsorshipCreateWithoutBrandInput[] | SponsorshipUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutBrandInput | SponsorshipCreateOrConnectWithoutBrandInput[]
    upsert?: SponsorshipUpsertWithWhereUniqueWithoutBrandInput | SponsorshipUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: SponsorshipCreateManyBrandInputEnvelope
    set?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    disconnect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    delete?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    update?: SponsorshipUpdateWithWhereUniqueWithoutBrandInput | SponsorshipUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: SponsorshipUpdateManyWithWhereWithoutBrandInput | SponsorshipUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: SponsorshipScalarWhereInput | SponsorshipScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutBrandInput | CampaignUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutBrandInput | CampaignUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutBrandInput | CampaignUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type SponsorshipUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<SponsorshipCreateWithoutBrandInput, SponsorshipUncheckedCreateWithoutBrandInput> | SponsorshipCreateWithoutBrandInput[] | SponsorshipUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SponsorshipCreateOrConnectWithoutBrandInput | SponsorshipCreateOrConnectWithoutBrandInput[]
    upsert?: SponsorshipUpsertWithWhereUniqueWithoutBrandInput | SponsorshipUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: SponsorshipCreateManyBrandInputEnvelope
    set?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    disconnect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    delete?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    connect?: SponsorshipWhereUniqueInput | SponsorshipWhereUniqueInput[]
    update?: SponsorshipUpdateWithWhereUniqueWithoutBrandInput | SponsorshipUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: SponsorshipUpdateManyWithWhereWithoutBrandInput | SponsorshipUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: SponsorshipScalarWhereInput | SponsorshipScalarWhereInput[]
  }

  export type BrandCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<BrandCreateWithoutCampaignsInput, BrandUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutCampaignsInput
    connect?: BrandWhereUniqueInput
  }

  export type InfluencerCreateNestedManyWithoutCampaignsInput = {
    create?: XOR<InfluencerCreateWithoutCampaignsInput, InfluencerUncheckedCreateWithoutCampaignsInput> | InfluencerCreateWithoutCampaignsInput[] | InfluencerUncheckedCreateWithoutCampaignsInput[]
    connectOrCreate?: InfluencerCreateOrConnectWithoutCampaignsInput | InfluencerCreateOrConnectWithoutCampaignsInput[]
    connect?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
  }

  export type ContentCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ContentCreateWithoutCampaignInput, ContentUncheckedCreateWithoutCampaignInput> | ContentCreateWithoutCampaignInput[] | ContentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutCampaignInput | ContentCreateOrConnectWithoutCampaignInput[]
    createMany?: ContentCreateManyCampaignInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  }

  export type InfluencerUncheckedCreateNestedManyWithoutCampaignsInput = {
    create?: XOR<InfluencerCreateWithoutCampaignsInput, InfluencerUncheckedCreateWithoutCampaignsInput> | InfluencerCreateWithoutCampaignsInput[] | InfluencerUncheckedCreateWithoutCampaignsInput[]
    connectOrCreate?: InfluencerCreateOrConnectWithoutCampaignsInput | InfluencerCreateOrConnectWithoutCampaignsInput[]
    connect?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
  }

  export type ContentUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ContentCreateWithoutCampaignInput, ContentUncheckedCreateWithoutCampaignInput> | ContentCreateWithoutCampaignInput[] | ContentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutCampaignInput | ContentCreateOrConnectWithoutCampaignInput[]
    createMany?: ContentCreateManyCampaignInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BrandUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<BrandCreateWithoutCampaignsInput, BrandUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutCampaignsInput
    upsert?: BrandUpsertWithoutCampaignsInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutCampaignsInput, BrandUpdateWithoutCampaignsInput>, BrandUncheckedUpdateWithoutCampaignsInput>
  }

  export type InfluencerUpdateManyWithoutCampaignsNestedInput = {
    create?: XOR<InfluencerCreateWithoutCampaignsInput, InfluencerUncheckedCreateWithoutCampaignsInput> | InfluencerCreateWithoutCampaignsInput[] | InfluencerUncheckedCreateWithoutCampaignsInput[]
    connectOrCreate?: InfluencerCreateOrConnectWithoutCampaignsInput | InfluencerCreateOrConnectWithoutCampaignsInput[]
    upsert?: InfluencerUpsertWithWhereUniqueWithoutCampaignsInput | InfluencerUpsertWithWhereUniqueWithoutCampaignsInput[]
    set?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    disconnect?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    delete?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    connect?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    update?: InfluencerUpdateWithWhereUniqueWithoutCampaignsInput | InfluencerUpdateWithWhereUniqueWithoutCampaignsInput[]
    updateMany?: InfluencerUpdateManyWithWhereWithoutCampaignsInput | InfluencerUpdateManyWithWhereWithoutCampaignsInput[]
    deleteMany?: InfluencerScalarWhereInput | InfluencerScalarWhereInput[]
  }

  export type ContentUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<ContentCreateWithoutCampaignInput, ContentUncheckedCreateWithoutCampaignInput> | ContentCreateWithoutCampaignInput[] | ContentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutCampaignInput | ContentCreateOrConnectWithoutCampaignInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutCampaignInput | ContentUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: ContentCreateManyCampaignInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutCampaignInput | ContentUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutCampaignInput | ContentUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  }

  export type InfluencerUncheckedUpdateManyWithoutCampaignsNestedInput = {
    create?: XOR<InfluencerCreateWithoutCampaignsInput, InfluencerUncheckedCreateWithoutCampaignsInput> | InfluencerCreateWithoutCampaignsInput[] | InfluencerUncheckedCreateWithoutCampaignsInput[]
    connectOrCreate?: InfluencerCreateOrConnectWithoutCampaignsInput | InfluencerCreateOrConnectWithoutCampaignsInput[]
    upsert?: InfluencerUpsertWithWhereUniqueWithoutCampaignsInput | InfluencerUpsertWithWhereUniqueWithoutCampaignsInput[]
    set?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    disconnect?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    delete?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    connect?: InfluencerWhereUniqueInput | InfluencerWhereUniqueInput[]
    update?: InfluencerUpdateWithWhereUniqueWithoutCampaignsInput | InfluencerUpdateWithWhereUniqueWithoutCampaignsInput[]
    updateMany?: InfluencerUpdateManyWithWhereWithoutCampaignsInput | InfluencerUpdateManyWithWhereWithoutCampaignsInput[]
    deleteMany?: InfluencerScalarWhereInput | InfluencerScalarWhereInput[]
  }

  export type ContentUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<ContentCreateWithoutCampaignInput, ContentUncheckedCreateWithoutCampaignInput> | ContentCreateWithoutCampaignInput[] | ContentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutCampaignInput | ContentCreateOrConnectWithoutCampaignInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutCampaignInput | ContentUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: ContentCreateManyCampaignInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutCampaignInput | ContentUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutCampaignInput | ContentUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  }

  export type BrandCreateNestedOneWithoutSponsorshipsInput = {
    create?: XOR<BrandCreateWithoutSponsorshipsInput, BrandUncheckedCreateWithoutSponsorshipsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutSponsorshipsInput
    connect?: BrandWhereUniqueInput
  }

  export type InfluencerCreateNestedOneWithoutSponsorshipsInput = {
    create?: XOR<InfluencerCreateWithoutSponsorshipsInput, InfluencerUncheckedCreateWithoutSponsorshipsInput>
    connectOrCreate?: InfluencerCreateOrConnectWithoutSponsorshipsInput
    connect?: InfluencerWhereUniqueInput
  }

  export type BrandUpdateOneRequiredWithoutSponsorshipsNestedInput = {
    create?: XOR<BrandCreateWithoutSponsorshipsInput, BrandUncheckedCreateWithoutSponsorshipsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutSponsorshipsInput
    upsert?: BrandUpsertWithoutSponsorshipsInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutSponsorshipsInput, BrandUpdateWithoutSponsorshipsInput>, BrandUncheckedUpdateWithoutSponsorshipsInput>
  }

  export type InfluencerUpdateOneRequiredWithoutSponsorshipsNestedInput = {
    create?: XOR<InfluencerCreateWithoutSponsorshipsInput, InfluencerUncheckedCreateWithoutSponsorshipsInput>
    connectOrCreate?: InfluencerCreateOrConnectWithoutSponsorshipsInput
    upsert?: InfluencerUpsertWithoutSponsorshipsInput
    connect?: InfluencerWhereUniqueInput
    update?: XOR<XOR<InfluencerUpdateToOneWithWhereWithoutSponsorshipsInput, InfluencerUpdateWithoutSponsorshipsInput>, InfluencerUncheckedUpdateWithoutSponsorshipsInput>
  }

  export type InfluencerCreateNestedOneWithoutSocialProfilesInput = {
    create?: XOR<InfluencerCreateWithoutSocialProfilesInput, InfluencerUncheckedCreateWithoutSocialProfilesInput>
    connectOrCreate?: InfluencerCreateOrConnectWithoutSocialProfilesInput
    connect?: InfluencerWhereUniqueInput
  }

  export type InfluencerUpdateOneRequiredWithoutSocialProfilesNestedInput = {
    create?: XOR<InfluencerCreateWithoutSocialProfilesInput, InfluencerUncheckedCreateWithoutSocialProfilesInput>
    connectOrCreate?: InfluencerCreateOrConnectWithoutSocialProfilesInput
    upsert?: InfluencerUpsertWithoutSocialProfilesInput
    connect?: InfluencerWhereUniqueInput
    update?: XOR<XOR<InfluencerUpdateToOneWithWhereWithoutSocialProfilesInput, InfluencerUpdateWithoutSocialProfilesInput>, InfluencerUncheckedUpdateWithoutSocialProfilesInput>
  }

  export type InfluencerCreateNestedOneWithoutContentInput = {
    create?: XOR<InfluencerCreateWithoutContentInput, InfluencerUncheckedCreateWithoutContentInput>
    connectOrCreate?: InfluencerCreateOrConnectWithoutContentInput
    connect?: InfluencerWhereUniqueInput
  }

  export type CampaignCreateNestedOneWithoutContentInput = {
    create?: XOR<CampaignCreateWithoutContentInput, CampaignUncheckedCreateWithoutContentInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutContentInput
    connect?: CampaignWhereUniqueInput
  }

  export type InfluencerUpdateOneRequiredWithoutContentNestedInput = {
    create?: XOR<InfluencerCreateWithoutContentInput, InfluencerUncheckedCreateWithoutContentInput>
    connectOrCreate?: InfluencerCreateOrConnectWithoutContentInput
    upsert?: InfluencerUpsertWithoutContentInput
    connect?: InfluencerWhereUniqueInput
    update?: XOR<XOR<InfluencerUpdateToOneWithWhereWithoutContentInput, InfluencerUpdateWithoutContentInput>, InfluencerUncheckedUpdateWithoutContentInput>
  }

  export type CampaignUpdateOneWithoutContentNestedInput = {
    create?: XOR<CampaignCreateWithoutContentInput, CampaignUncheckedCreateWithoutContentInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutContentInput
    upsert?: CampaignUpsertWithoutContentInput
    disconnect?: CampaignWhereInput | boolean
    delete?: CampaignWhereInput | boolean
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutContentInput, CampaignUpdateWithoutContentInput>, CampaignUncheckedUpdateWithoutContentInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SocialProfileCreateWithoutInfluencerInput = {
    id?: string
    platform: string
    handle: string
    url?: string | null
    followers?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocialProfileUncheckedCreateWithoutInfluencerInput = {
    id?: string
    platform: string
    handle: string
    url?: string | null
    followers?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocialProfileCreateOrConnectWithoutInfluencerInput = {
    where: SocialProfileWhereUniqueInput
    create: XOR<SocialProfileCreateWithoutInfluencerInput, SocialProfileUncheckedCreateWithoutInfluencerInput>
  }

  export type SocialProfileCreateManyInfluencerInputEnvelope = {
    data: SocialProfileCreateManyInfluencerInput | SocialProfileCreateManyInfluencerInput[]
    skipDuplicates?: boolean
  }

  export type CampaignCreateWithoutInfluencersInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutCampaignsInput
    content?: ContentCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutInfluencersInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
    content?: ContentUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutInfluencersInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutInfluencersInput, CampaignUncheckedCreateWithoutInfluencersInput>
  }

  export type SponsorshipCreateWithoutInfluencerInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutSponsorshipsInput
  }

  export type SponsorshipUncheckedCreateWithoutInfluencerInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
  }

  export type SponsorshipCreateOrConnectWithoutInfluencerInput = {
    where: SponsorshipWhereUniqueInput
    create: XOR<SponsorshipCreateWithoutInfluencerInput, SponsorshipUncheckedCreateWithoutInfluencerInput>
  }

  export type SponsorshipCreateManyInfluencerInputEnvelope = {
    data: SponsorshipCreateManyInfluencerInput | SponsorshipCreateManyInfluencerInput[]
    skipDuplicates?: boolean
  }

  export type ContentCreateWithoutInfluencerInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign?: CampaignCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateWithoutInfluencerInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignId?: string | null
  }

  export type ContentCreateOrConnectWithoutInfluencerInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutInfluencerInput, ContentUncheckedCreateWithoutInfluencerInput>
  }

  export type ContentCreateManyInfluencerInputEnvelope = {
    data: ContentCreateManyInfluencerInput | ContentCreateManyInfluencerInput[]
    skipDuplicates?: boolean
  }

  export type SocialProfileUpsertWithWhereUniqueWithoutInfluencerInput = {
    where: SocialProfileWhereUniqueInput
    update: XOR<SocialProfileUpdateWithoutInfluencerInput, SocialProfileUncheckedUpdateWithoutInfluencerInput>
    create: XOR<SocialProfileCreateWithoutInfluencerInput, SocialProfileUncheckedCreateWithoutInfluencerInput>
  }

  export type SocialProfileUpdateWithWhereUniqueWithoutInfluencerInput = {
    where: SocialProfileWhereUniqueInput
    data: XOR<SocialProfileUpdateWithoutInfluencerInput, SocialProfileUncheckedUpdateWithoutInfluencerInput>
  }

  export type SocialProfileUpdateManyWithWhereWithoutInfluencerInput = {
    where: SocialProfileScalarWhereInput
    data: XOR<SocialProfileUpdateManyMutationInput, SocialProfileUncheckedUpdateManyWithoutInfluencerInput>
  }

  export type SocialProfileScalarWhereInput = {
    AND?: SocialProfileScalarWhereInput | SocialProfileScalarWhereInput[]
    OR?: SocialProfileScalarWhereInput[]
    NOT?: SocialProfileScalarWhereInput | SocialProfileScalarWhereInput[]
    id?: StringFilter<"SocialProfile"> | string
    platform?: StringFilter<"SocialProfile"> | string
    handle?: StringFilter<"SocialProfile"> | string
    url?: StringNullableFilter<"SocialProfile"> | string | null
    followers?: IntNullableFilter<"SocialProfile"> | number | null
    createdAt?: DateTimeFilter<"SocialProfile"> | Date | string
    updatedAt?: DateTimeFilter<"SocialProfile"> | Date | string
    influencerId?: StringFilter<"SocialProfile"> | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutInfluencersInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutInfluencersInput, CampaignUncheckedUpdateWithoutInfluencersInput>
    create: XOR<CampaignCreateWithoutInfluencersInput, CampaignUncheckedCreateWithoutInfluencersInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutInfluencersInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutInfluencersInput, CampaignUncheckedUpdateWithoutInfluencersInput>
  }

  export type CampaignUpdateManyWithWhereWithoutInfluencersInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutInfluencersInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    status?: StringFilter<"Campaign"> | string
    budget?: FloatNullableFilter<"Campaign"> | number | null
    startDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    requirements?: StringNullableFilter<"Campaign"> | string | null
    goals?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    brandId?: StringFilter<"Campaign"> | string
  }

  export type SponsorshipUpsertWithWhereUniqueWithoutInfluencerInput = {
    where: SponsorshipWhereUniqueInput
    update: XOR<SponsorshipUpdateWithoutInfluencerInput, SponsorshipUncheckedUpdateWithoutInfluencerInput>
    create: XOR<SponsorshipCreateWithoutInfluencerInput, SponsorshipUncheckedCreateWithoutInfluencerInput>
  }

  export type SponsorshipUpdateWithWhereUniqueWithoutInfluencerInput = {
    where: SponsorshipWhereUniqueInput
    data: XOR<SponsorshipUpdateWithoutInfluencerInput, SponsorshipUncheckedUpdateWithoutInfluencerInput>
  }

  export type SponsorshipUpdateManyWithWhereWithoutInfluencerInput = {
    where: SponsorshipScalarWhereInput
    data: XOR<SponsorshipUpdateManyMutationInput, SponsorshipUncheckedUpdateManyWithoutInfluencerInput>
  }

  export type SponsorshipScalarWhereInput = {
    AND?: SponsorshipScalarWhereInput | SponsorshipScalarWhereInput[]
    OR?: SponsorshipScalarWhereInput[]
    NOT?: SponsorshipScalarWhereInput | SponsorshipScalarWhereInput[]
    id?: StringFilter<"Sponsorship"> | string
    startDate?: DateTimeFilter<"Sponsorship"> | Date | string
    endDate?: DateTimeFilter<"Sponsorship"> | Date | string
    terms?: StringNullableFilter<"Sponsorship"> | string | null
    compensation?: FloatNullableFilter<"Sponsorship"> | number | null
    status?: StringFilter<"Sponsorship"> | string
    createdAt?: DateTimeFilter<"Sponsorship"> | Date | string
    updatedAt?: DateTimeFilter<"Sponsorship"> | Date | string
    brandId?: StringFilter<"Sponsorship"> | string
    influencerId?: StringFilter<"Sponsorship"> | string
  }

  export type ContentUpsertWithWhereUniqueWithoutInfluencerInput = {
    where: ContentWhereUniqueInput
    update: XOR<ContentUpdateWithoutInfluencerInput, ContentUncheckedUpdateWithoutInfluencerInput>
    create: XOR<ContentCreateWithoutInfluencerInput, ContentUncheckedCreateWithoutInfluencerInput>
  }

  export type ContentUpdateWithWhereUniqueWithoutInfluencerInput = {
    where: ContentWhereUniqueInput
    data: XOR<ContentUpdateWithoutInfluencerInput, ContentUncheckedUpdateWithoutInfluencerInput>
  }

  export type ContentUpdateManyWithWhereWithoutInfluencerInput = {
    where: ContentScalarWhereInput
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyWithoutInfluencerInput>
  }

  export type ContentScalarWhereInput = {
    AND?: ContentScalarWhereInput | ContentScalarWhereInput[]
    OR?: ContentScalarWhereInput[]
    NOT?: ContentScalarWhereInput | ContentScalarWhereInput[]
    id?: StringFilter<"Content"> | string
    type?: StringFilter<"Content"> | string
    title?: StringNullableFilter<"Content"> | string | null
    body?: StringNullableFilter<"Content"> | string | null
    mediaUrl?: StringNullableFilter<"Content"> | string | null
    publishDate?: DateTimeNullableFilter<"Content"> | Date | string | null
    status?: StringFilter<"Content"> | string
    metrics?: JsonNullableFilter<"Content">
    createdAt?: DateTimeFilter<"Content"> | Date | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    influencerId?: StringFilter<"Content"> | string
    campaignId?: StringNullableFilter<"Content"> | string | null
  }

  export type CampaignCreateWithoutBrandInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    influencers?: InfluencerCreateNestedManyWithoutCampaignsInput
    content?: ContentCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutBrandInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    influencers?: InfluencerUncheckedCreateNestedManyWithoutCampaignsInput
    content?: ContentUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutBrandInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput>
  }

  export type CampaignCreateManyBrandInputEnvelope = {
    data: CampaignCreateManyBrandInput | CampaignCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type SponsorshipCreateWithoutBrandInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: InfluencerCreateNestedOneWithoutSponsorshipsInput
  }

  export type SponsorshipUncheckedCreateWithoutBrandInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
  }

  export type SponsorshipCreateOrConnectWithoutBrandInput = {
    where: SponsorshipWhereUniqueInput
    create: XOR<SponsorshipCreateWithoutBrandInput, SponsorshipUncheckedCreateWithoutBrandInput>
  }

  export type SponsorshipCreateManyBrandInputEnvelope = {
    data: SponsorshipCreateManyBrandInput | SponsorshipCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type CampaignUpsertWithWhereUniqueWithoutBrandInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutBrandInput, CampaignUncheckedUpdateWithoutBrandInput>
    create: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutBrandInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutBrandInput, CampaignUncheckedUpdateWithoutBrandInput>
  }

  export type CampaignUpdateManyWithWhereWithoutBrandInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutBrandInput>
  }

  export type SponsorshipUpsertWithWhereUniqueWithoutBrandInput = {
    where: SponsorshipWhereUniqueInput
    update: XOR<SponsorshipUpdateWithoutBrandInput, SponsorshipUncheckedUpdateWithoutBrandInput>
    create: XOR<SponsorshipCreateWithoutBrandInput, SponsorshipUncheckedCreateWithoutBrandInput>
  }

  export type SponsorshipUpdateWithWhereUniqueWithoutBrandInput = {
    where: SponsorshipWhereUniqueInput
    data: XOR<SponsorshipUpdateWithoutBrandInput, SponsorshipUncheckedUpdateWithoutBrandInput>
  }

  export type SponsorshipUpdateManyWithWhereWithoutBrandInput = {
    where: SponsorshipScalarWhereInput
    data: XOR<SponsorshipUpdateManyMutationInput, SponsorshipUncheckedUpdateManyWithoutBrandInput>
  }

  export type BrandCreateWithoutCampaignsInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sponsorships?: SponsorshipCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutCampaignsInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sponsorships?: SponsorshipUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutCampaignsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutCampaignsInput, BrandUncheckedCreateWithoutCampaignsInput>
  }

  export type InfluencerCreateWithoutCampaignsInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileCreateNestedManyWithoutInfluencerInput
    sponsorships?: SponsorshipCreateNestedManyWithoutInfluencerInput
    content?: ContentCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerUncheckedCreateWithoutCampaignsInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileUncheckedCreateNestedManyWithoutInfluencerInput
    sponsorships?: SponsorshipUncheckedCreateNestedManyWithoutInfluencerInput
    content?: ContentUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerCreateOrConnectWithoutCampaignsInput = {
    where: InfluencerWhereUniqueInput
    create: XOR<InfluencerCreateWithoutCampaignsInput, InfluencerUncheckedCreateWithoutCampaignsInput>
  }

  export type ContentCreateWithoutCampaignInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: InfluencerCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateWithoutCampaignInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
  }

  export type ContentCreateOrConnectWithoutCampaignInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutCampaignInput, ContentUncheckedCreateWithoutCampaignInput>
  }

  export type ContentCreateManyCampaignInputEnvelope = {
    data: ContentCreateManyCampaignInput | ContentCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type BrandUpsertWithoutCampaignsInput = {
    update: XOR<BrandUpdateWithoutCampaignsInput, BrandUncheckedUpdateWithoutCampaignsInput>
    create: XOR<BrandCreateWithoutCampaignsInput, BrandUncheckedCreateWithoutCampaignsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutCampaignsInput, BrandUncheckedUpdateWithoutCampaignsInput>
  }

  export type BrandUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsorships?: SponsorshipUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsorships?: SponsorshipUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type InfluencerUpsertWithWhereUniqueWithoutCampaignsInput = {
    where: InfluencerWhereUniqueInput
    update: XOR<InfluencerUpdateWithoutCampaignsInput, InfluencerUncheckedUpdateWithoutCampaignsInput>
    create: XOR<InfluencerCreateWithoutCampaignsInput, InfluencerUncheckedCreateWithoutCampaignsInput>
  }

  export type InfluencerUpdateWithWhereUniqueWithoutCampaignsInput = {
    where: InfluencerWhereUniqueInput
    data: XOR<InfluencerUpdateWithoutCampaignsInput, InfluencerUncheckedUpdateWithoutCampaignsInput>
  }

  export type InfluencerUpdateManyWithWhereWithoutCampaignsInput = {
    where: InfluencerScalarWhereInput
    data: XOR<InfluencerUpdateManyMutationInput, InfluencerUncheckedUpdateManyWithoutCampaignsInput>
  }

  export type InfluencerScalarWhereInput = {
    AND?: InfluencerScalarWhereInput | InfluencerScalarWhereInput[]
    OR?: InfluencerScalarWhereInput[]
    NOT?: InfluencerScalarWhereInput | InfluencerScalarWhereInput[]
    id?: StringFilter<"Influencer"> | string
    handle?: StringFilter<"Influencer"> | string
    name?: StringFilter<"Influencer"> | string
    bio?: StringNullableFilter<"Influencer"> | string | null
    image?: StringNullableFilter<"Influencer"> | string | null
    category?: StringNullableFilter<"Influencer"> | string | null
    followers?: IntFilter<"Influencer"> | number
    engagementRate?: FloatNullableFilter<"Influencer"> | number | null
    posts?: IntNullableFilter<"Influencer"> | number | null
    verified?: BoolFilter<"Influencer"> | boolean
    featured?: BoolFilter<"Influencer"> | boolean
    tagType?: StringNullableFilter<"Influencer"> | string | null
    email?: StringNullableFilter<"Influencer"> | string | null
    phone?: StringNullableFilter<"Influencer"> | string | null
    location?: StringNullableFilter<"Influencer"> | string | null
    tags?: JsonNullableFilter<"Influencer">
    createdAt?: DateTimeFilter<"Influencer"> | Date | string
    updatedAt?: DateTimeFilter<"Influencer"> | Date | string
  }

  export type ContentUpsertWithWhereUniqueWithoutCampaignInput = {
    where: ContentWhereUniqueInput
    update: XOR<ContentUpdateWithoutCampaignInput, ContentUncheckedUpdateWithoutCampaignInput>
    create: XOR<ContentCreateWithoutCampaignInput, ContentUncheckedCreateWithoutCampaignInput>
  }

  export type ContentUpdateWithWhereUniqueWithoutCampaignInput = {
    where: ContentWhereUniqueInput
    data: XOR<ContentUpdateWithoutCampaignInput, ContentUncheckedUpdateWithoutCampaignInput>
  }

  export type ContentUpdateManyWithWhereWithoutCampaignInput = {
    where: ContentScalarWhereInput
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyWithoutCampaignInput>
  }

  export type BrandCreateWithoutSponsorshipsInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutSponsorshipsInput = {
    id?: string
    name: string
    logo?: string | null
    industry?: string | null
    website?: string | null
    description?: string | null
    contactName?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutSponsorshipsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutSponsorshipsInput, BrandUncheckedCreateWithoutSponsorshipsInput>
  }

  export type InfluencerCreateWithoutSponsorshipsInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileCreateNestedManyWithoutInfluencerInput
    campaigns?: CampaignCreateNestedManyWithoutInfluencersInput
    content?: ContentCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerUncheckedCreateWithoutSponsorshipsInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileUncheckedCreateNestedManyWithoutInfluencerInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutInfluencersInput
    content?: ContentUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerCreateOrConnectWithoutSponsorshipsInput = {
    where: InfluencerWhereUniqueInput
    create: XOR<InfluencerCreateWithoutSponsorshipsInput, InfluencerUncheckedCreateWithoutSponsorshipsInput>
  }

  export type BrandUpsertWithoutSponsorshipsInput = {
    update: XOR<BrandUpdateWithoutSponsorshipsInput, BrandUncheckedUpdateWithoutSponsorshipsInput>
    create: XOR<BrandCreateWithoutSponsorshipsInput, BrandUncheckedCreateWithoutSponsorshipsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutSponsorshipsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutSponsorshipsInput, BrandUncheckedUpdateWithoutSponsorshipsInput>
  }

  export type BrandUpdateWithoutSponsorshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutSponsorshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type InfluencerUpsertWithoutSponsorshipsInput = {
    update: XOR<InfluencerUpdateWithoutSponsorshipsInput, InfluencerUncheckedUpdateWithoutSponsorshipsInput>
    create: XOR<InfluencerCreateWithoutSponsorshipsInput, InfluencerUncheckedCreateWithoutSponsorshipsInput>
    where?: InfluencerWhereInput
  }

  export type InfluencerUpdateToOneWithWhereWithoutSponsorshipsInput = {
    where?: InfluencerWhereInput
    data: XOR<InfluencerUpdateWithoutSponsorshipsInput, InfluencerUncheckedUpdateWithoutSponsorshipsInput>
  }

  export type InfluencerUpdateWithoutSponsorshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUpdateManyWithoutInfluencerNestedInput
    campaigns?: CampaignUpdateManyWithoutInfluencersNestedInput
    content?: ContentUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerUncheckedUpdateWithoutSponsorshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUncheckedUpdateManyWithoutInfluencerNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutInfluencersNestedInput
    content?: ContentUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerCreateWithoutSocialProfilesInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignCreateNestedManyWithoutInfluencersInput
    sponsorships?: SponsorshipCreateNestedManyWithoutInfluencerInput
    content?: ContentCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerUncheckedCreateWithoutSocialProfilesInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignUncheckedCreateNestedManyWithoutInfluencersInput
    sponsorships?: SponsorshipUncheckedCreateNestedManyWithoutInfluencerInput
    content?: ContentUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerCreateOrConnectWithoutSocialProfilesInput = {
    where: InfluencerWhereUniqueInput
    create: XOR<InfluencerCreateWithoutSocialProfilesInput, InfluencerUncheckedCreateWithoutSocialProfilesInput>
  }

  export type InfluencerUpsertWithoutSocialProfilesInput = {
    update: XOR<InfluencerUpdateWithoutSocialProfilesInput, InfluencerUncheckedUpdateWithoutSocialProfilesInput>
    create: XOR<InfluencerCreateWithoutSocialProfilesInput, InfluencerUncheckedCreateWithoutSocialProfilesInput>
    where?: InfluencerWhereInput
  }

  export type InfluencerUpdateToOneWithWhereWithoutSocialProfilesInput = {
    where?: InfluencerWhereInput
    data: XOR<InfluencerUpdateWithoutSocialProfilesInput, InfluencerUncheckedUpdateWithoutSocialProfilesInput>
  }

  export type InfluencerUpdateWithoutSocialProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUpdateManyWithoutInfluencersNestedInput
    sponsorships?: SponsorshipUpdateManyWithoutInfluencerNestedInput
    content?: ContentUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerUncheckedUpdateWithoutSocialProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUncheckedUpdateManyWithoutInfluencersNestedInput
    sponsorships?: SponsorshipUncheckedUpdateManyWithoutInfluencerNestedInput
    content?: ContentUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerCreateWithoutContentInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileCreateNestedManyWithoutInfluencerInput
    campaigns?: CampaignCreateNestedManyWithoutInfluencersInput
    sponsorships?: SponsorshipCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerUncheckedCreateWithoutContentInput = {
    id?: string
    handle: string
    name: string
    bio?: string | null
    image?: string | null
    category?: string | null
    followers?: number
    engagementRate?: number | null
    posts?: number | null
    verified?: boolean
    featured?: boolean
    tagType?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    socialProfiles?: SocialProfileUncheckedCreateNestedManyWithoutInfluencerInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutInfluencersInput
    sponsorships?: SponsorshipUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type InfluencerCreateOrConnectWithoutContentInput = {
    where: InfluencerWhereUniqueInput
    create: XOR<InfluencerCreateWithoutContentInput, InfluencerUncheckedCreateWithoutContentInput>
  }

  export type CampaignCreateWithoutContentInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutCampaignsInput
    influencers?: InfluencerCreateNestedManyWithoutCampaignsInput
  }

  export type CampaignUncheckedCreateWithoutContentInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
    influencers?: InfluencerUncheckedCreateNestedManyWithoutCampaignsInput
  }

  export type CampaignCreateOrConnectWithoutContentInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutContentInput, CampaignUncheckedCreateWithoutContentInput>
  }

  export type InfluencerUpsertWithoutContentInput = {
    update: XOR<InfluencerUpdateWithoutContentInput, InfluencerUncheckedUpdateWithoutContentInput>
    create: XOR<InfluencerCreateWithoutContentInput, InfluencerUncheckedCreateWithoutContentInput>
    where?: InfluencerWhereInput
  }

  export type InfluencerUpdateToOneWithWhereWithoutContentInput = {
    where?: InfluencerWhereInput
    data: XOR<InfluencerUpdateWithoutContentInput, InfluencerUncheckedUpdateWithoutContentInput>
  }

  export type InfluencerUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUpdateManyWithoutInfluencerNestedInput
    campaigns?: CampaignUpdateManyWithoutInfluencersNestedInput
    sponsorships?: SponsorshipUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerUncheckedUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUncheckedUpdateManyWithoutInfluencerNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutInfluencersNestedInput
    sponsorships?: SponsorshipUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type CampaignUpsertWithoutContentInput = {
    update: XOR<CampaignUpdateWithoutContentInput, CampaignUncheckedUpdateWithoutContentInput>
    create: XOR<CampaignCreateWithoutContentInput, CampaignUncheckedCreateWithoutContentInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutContentInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutContentInput, CampaignUncheckedUpdateWithoutContentInput>
  }

  export type CampaignUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutCampaignsNestedInput
    influencers?: InfluencerUpdateManyWithoutCampaignsNestedInput
  }

  export type CampaignUncheckedUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
    influencers?: InfluencerUncheckedUpdateManyWithoutCampaignsNestedInput
  }

  export type SocialProfileCreateManyInfluencerInput = {
    id?: string
    platform: string
    handle: string
    url?: string | null
    followers?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SponsorshipCreateManyInfluencerInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId: string
  }

  export type ContentCreateManyInfluencerInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignId?: string | null
  }

  export type SocialProfileUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialProfileUncheckedUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialProfileUncheckedUpdateManyWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUpdateWithoutInfluencersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutCampaignsNestedInput
    content?: ContentUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutInfluencersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
    content?: ContentUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutInfluencersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
  }

  export type SponsorshipUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutSponsorshipsNestedInput
  }

  export type SponsorshipUncheckedUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
  }

  export type SponsorshipUncheckedUpdateManyWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContentUncheckedUpdateManyWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CampaignCreateManyBrandInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    budget?: number | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    requirements?: string | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SponsorshipCreateManyBrandInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    terms?: string | null
    compensation?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
  }

  export type CampaignUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencers?: InfluencerUpdateManyWithoutCampaignsNestedInput
    content?: ContentUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencers?: InfluencerUncheckedUpdateManyWithoutCampaignsNestedInput
    content?: ContentUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SponsorshipUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: InfluencerUpdateOneRequiredWithoutSponsorshipsNestedInput
  }

  export type SponsorshipUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type SponsorshipUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    compensation?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateManyCampaignInput = {
    id?: string
    type: string
    title?: string | null
    body?: string | null
    mediaUrl?: string | null
    publishDate?: Date | string | null
    status?: string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    influencerId: string
  }

  export type InfluencerUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUpdateManyWithoutInfluencerNestedInput
    sponsorships?: SponsorshipUpdateManyWithoutInfluencerNestedInput
    content?: ContentUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfiles?: SocialProfileUncheckedUpdateManyWithoutInfluencerNestedInput
    sponsorships?: SponsorshipUncheckedUpdateManyWithoutInfluencerNestedInput
    content?: ContentUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type InfluencerUncheckedUpdateManyWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    posts?: NullableIntFieldUpdateOperationsInput | number | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    tagType?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: InfluencerUpdateOneRequiredWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    metrics?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencerId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use InfluencerCountOutputTypeDefaultArgs instead
     */
    export type InfluencerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InfluencerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BrandCountOutputTypeDefaultArgs instead
     */
    export type BrandCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BrandCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CampaignCountOutputTypeDefaultArgs instead
     */
    export type CampaignCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CampaignCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InfluencerDefaultArgs instead
     */
    export type InfluencerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InfluencerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BrandDefaultArgs instead
     */
    export type BrandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BrandDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CampaignDefaultArgs instead
     */
    export type CampaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CampaignDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SponsorshipDefaultArgs instead
     */
    export type SponsorshipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SponsorshipDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SocialProfileDefaultArgs instead
     */
    export type SocialProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SocialProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContentDefaultArgs instead
     */
    export type ContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContentDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}