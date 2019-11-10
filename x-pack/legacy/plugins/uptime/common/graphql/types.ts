/* tslint:disable */
/* eslint-disable */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SiemContext } from '../lib/types';

export type Maybe<T> = T | null;

export enum CursorDirection {
  AFTER = 'AFTER',
  BEFORE = 'BEFORE',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type UnsignedInteger = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  /** Get a list of all recorded pings for all monitors */
  allPings: PingResults;
  /** Gets the number of documents in the target index */
  getDocCount: DocCount;

  getMonitors?: Maybe<LatestMonitorsResult>;

  getSnapshot?: Maybe<Snapshot>;

  getSnapshotHistogram?: Maybe<HistogramResult>;

  getMonitorChartsData?: Maybe<MonitorChart>;
  /** Fetch the most recent event data for a monitor ID, date range, location. */
  getLatestMonitors: Ping[];

  getFilterBar?: Maybe<FilterBar>;

  getMonitorPageTitle?: Maybe<MonitorPageTitle>;
  /** Fetches the current state of Uptime monitors for the given parameters. */
  getMonitorStates?: Maybe<MonitorSummaryResult>;
  /** Fetches details about the uptime index. */
  getStatesIndexStatus: StatesIndexStatus;
}

export interface PingResults {
  /** Total number of matching pings */
  total: UnsignedInteger;
  /** Unique list of all locations the query matched */
  locations: string[];
  /** List of pings */
  pings: Ping[];
}

/** A request sent from a monitor to a host */
export interface Ping {
  /** unique ID for this ping */
  id: string;
  /** The timestamp of the ping's creation */
  timestamp: string;
  /** The agent that recorded the ping */
  beat?: Maybe<Beat>;

  container?: Maybe<Container>;

  docker?: Maybe<Docker>;

  ecs?: Maybe<Ecs>;

  error?: Maybe<Error>;

  host?: Maybe<Host>;

  http?: Maybe<Http>;

  icmp?: Maybe<Icmp>;

  kubernetes?: Maybe<Kubernetes>;

  meta?: Maybe<Meta>;

  monitor?: Maybe<Monitor>;

  observer?: Maybe<Observer>;

  resolve?: Maybe<Resolve>;

  socks5?: Maybe<Socks5>;

  summary?: Maybe<Summary>;

  tags?: Maybe<string>;

  tcp?: Maybe<Tcp>;

  tls?: Maybe<PingTls>;

  url?: Maybe<Url>;
}

/** An agent for recording a beat */
export interface Beat {
  hostname?: Maybe<string>;

  name?: Maybe<string>;

  timezone?: Maybe<string>;

  type?: Maybe<string>;
}

export interface Container {
  id?: Maybe<string>;

  image?: Maybe<ContainerImage>;

  name?: Maybe<string>;

  runtime?: Maybe<string>;
}

export interface ContainerImage {
  name?: Maybe<string>;

  tag?: Maybe<string>;
}

export interface Docker {
  id?: Maybe<string>;

  image?: Maybe<string>;

  name?: Maybe<string>;
}

export interface Ecs {
  version?: Maybe<string>;
}

export interface Error {
  code?: Maybe<number>;

  message?: Maybe<string>;

  type?: Maybe<string>;
}

export interface Host {
  architecture?: Maybe<string>;

  id?: Maybe<string>;

  hostname?: Maybe<string>;

  ip?: Maybe<string>;

  mac?: Maybe<string>;

  name?: Maybe<string>;

  os?: Maybe<Os>;
}

export interface Os {
  family?: Maybe<string>;

  kernel?: Maybe<string>;

  platform?: Maybe<string>;

  version?: Maybe<string>;

  name?: Maybe<string>;

  build?: Maybe<string>;
}

export interface Http {
  response?: Maybe<HttpResponse>;

  rtt?: Maybe<HttpRtt>;

  url?: Maybe<string>;
}

export interface HttpResponse {
  status_code?: Maybe<UnsignedInteger>;

  body?: Maybe<HttpBody>;
}

export interface HttpBody {
  /** Size of HTTP response body in bytes */
  bytes?: Maybe<UnsignedInteger>;
  /** Hash of the HTTP response body */
  hash?: Maybe<string>;
  /** Response body of the HTTP Response. May be truncated based on client settings. */
  content?: Maybe<string>;
  /** Byte length of the content string, taking into account multibyte chars. */
  content_bytes?: Maybe<UnsignedInteger>;
}

export interface HttpRtt {
  content?: Maybe<Duration>;

  response_header?: Maybe<Duration>;

  total?: Maybe<Duration>;

  validate?: Maybe<Duration>;

  validate_body?: Maybe<Duration>;

  write_request?: Maybe<Duration>;
}

/** The monitor's status for a ping */
export interface Duration {
  us?: Maybe<UnsignedInteger>;
}

export interface Icmp {
  requests?: Maybe<number>;

  rtt?: Maybe<number>;
}

export interface Kubernetes {
  container?: Maybe<KubernetesContainer>;

  namespace?: Maybe<string>;

  node?: Maybe<KubernetesNode>;

  pod?: Maybe<KubernetesPod>;
}

export interface KubernetesContainer {
  image?: Maybe<string>;

  name?: Maybe<string>;
}

export interface KubernetesNode {
  name?: Maybe<string>;
}

export interface KubernetesPod {
  name?: Maybe<string>;

  uid?: Maybe<string>;
}

export interface Meta {
  cloud?: Maybe<MetaCloud>;
}

export interface MetaCloud {
  availability_zone?: Maybe<string>;

  instance_id?: Maybe<string>;

  instance_name?: Maybe<string>;

  machine_type?: Maybe<string>;

  project_id?: Maybe<string>;

  provider?: Maybe<string>;

  region?: Maybe<string>;
}

export interface Monitor {
  duration?: Maybe<Duration>;

  host?: Maybe<string>;
  /** The id of the monitor */
  id?: Maybe<string>;
  /** The IP pinged by the monitor */
  ip?: Maybe<string>;
  /** The name of the protocol being monitored */
  name?: Maybe<string>;
  /** The protocol scheme of the monitored host */
  scheme?: Maybe<string>;
  /** The status of the monitored host */
  status?: Maybe<string>;
  /** The type of host being monitored */
  type?: Maybe<string>;

  check_group?: Maybe<string>;
}

/** Metadata added by a proccessor, which is specified in its configuration. */
export interface Observer {
  /** Geolocation data for the agent. */
  geo?: Maybe<Geo>;
}

/** Geolocation data added via processors to enrich events. */
export interface Geo {
  /** Name of the city in which the agent is running. */
  city_name?: Maybe<string>;
  /** The name of the continent on which the agent is running. */
  continent_name?: Maybe<string>;
  /** ISO designation for the agent's country. */
  country_iso_code?: Maybe<string>;
  /** The name of the agent's country. */
  country_name?: Maybe<string>;
  /** The lat/long of the agent. */
  location?: Maybe<string>;
  /** A name for the host's location, e.g. 'us-east-1' or 'LAX'. */
  name?: Maybe<string>;
  /** ISO designation of the agent's region. */
  region_iso_code?: Maybe<string>;
  /** Name of the region hosting the agent. */
  region_name?: Maybe<string>;
}

export interface Resolve {
  host?: Maybe<string>;

  ip?: Maybe<string>;

  rtt?: Maybe<Duration>;
}

export interface Socks5 {
  rtt?: Maybe<Rtt>;
}

export interface Rtt {
  connect?: Maybe<Duration>;

  handshake?: Maybe<Duration>;

  validate?: Maybe<Duration>;
}

export interface Summary {
  up?: Maybe<number>;

  down?: Maybe<number>;

  geo?: Maybe<CheckGeo>;
}

export interface CheckGeo {
  name?: Maybe<string>;

  location?: Maybe<Location>;
}

export interface Location {
  lat?: Maybe<number>;

  lon?: Maybe<number>;
}

export interface Tcp {
  port?: Maybe<number>;

  rtt?: Maybe<Rtt>;
}

/** Contains monitor transmission encryption information. */
export interface PingTls {
  /** The date and time after which the certificate is invalid. */
  certificate_not_valid_after?: Maybe<string>;

  certificate_not_valid_before?: Maybe<string>;

  certificates?: Maybe<string>;

  rtt?: Maybe<Rtt>;
}

export interface Url {
  full?: Maybe<string>;

  scheme?: Maybe<string>;

  domain?: Maybe<string>;

  port?: Maybe<number>;

  path?: Maybe<string>;

  query?: Maybe<string>;
}

export interface DocCount {
  count: UnsignedInteger;
}

export interface LatestMonitorsResult {
  monitors?: Maybe<LatestMonitor[]>;
}

/** Represents the latest recorded information about a monitor. */
export interface LatestMonitor {
  /** The ID of the monitor represented by this data. */
  id: MonitorKey;
  /** Information from the latest document. */
  ping?: Maybe<Ping>;
  /** Buckets of recent up count status data. */
  upSeries?: Maybe<MonitorSeriesPoint[]>;
  /** Buckets of recent down count status data. */
  downSeries?: Maybe<MonitorSeriesPoint[]>;
}

export interface MonitorKey {
  key: string;

  url?: Maybe<string>;
}

export interface MonitorSeriesPoint {
  x?: Maybe<UnsignedInteger>;

  y?: Maybe<number>;
}

export interface Snapshot {
  counts: SnapshotCount;
}

export interface SnapshotCount {
  up: number;

  down: number;

  mixed: number;

  total: number;
}

export interface HistogramResult {
  histogram: (Maybe<HistogramDataPoint>)[];

  interval: UnsignedInteger;
}

export interface HistogramDataPoint {
  upCount?: Maybe<number>;

  downCount?: Maybe<number>;

  x?: Maybe<UnsignedInteger>;

  x0?: Maybe<UnsignedInteger>;

  y?: Maybe<UnsignedInteger>;
}

/** The data used to populate the monitor charts. */
export interface MonitorChart {
  /** The average values for the monitor duration. */
  locationDurationLines: LocationDurationLine[];
  /** The counts of up/down checks for the monitor. */
  status: StatusData[];
  /** The maximum status doc count in this chart. */
  statusMaxCount: number;
  /** The maximum duration value in this chart. */
  durationMaxValue: number;
}

export interface LocationDurationLine {
  name: string;

  line: MonitorDurationAveragePoint[];
}

/** Represents the average monitor duration ms at a point in time. */
export interface MonitorDurationAveragePoint {
  /** The timeseries value for this point. */
  x: UnsignedInteger;
  /** The average duration ms for the monitor. */
  y?: Maybe<number>;
}

/** Represents a bucket of monitor status information. */
export interface StatusData {
  /** The timeseries point for this status data. */
  x: UnsignedInteger;
  /** The value of up counts for this point. */
  up?: Maybe<number>;
  /** The value for down counts for this point. */
  down?: Maybe<number>;
  /** The total down counts for this point. */
  total?: Maybe<number>;
}

/** The data used to enrich the filter bar. */
export interface FilterBar {
  /** A series of monitor IDs in the heartbeat indices. */
  ids?: Maybe<string[]>;
  /** The location values users have configured for the agents. */
  locations?: Maybe<string[]>;
  /** The ports of the monitored endpoints. */
  ports?: Maybe<number[]>;
  /** The schemes used by the monitors. */
  schemes?: Maybe<string[]>;
  /** The possible status values contained in the indices. */
  statuses?: Maybe<string[]>;
  /** The list of URLs */
  urls?: Maybe<string[]>;
}

export interface MonitorPageTitle {
  id: string;

  url?: Maybe<string>;

  name?: Maybe<string>;
}

/** The primary object returned for monitor states. */
export interface MonitorSummaryResult {
  /** Used to go to the next page of results */
  prevPagePagination?: Maybe<string>;
  /** Used to go to the previous page of results */
  nextPagePagination?: Maybe<string>;
  /** The objects representing the state of a series of heartbeat monitors. */
  summaries?: Maybe<MonitorSummary[]>;
  /** The number of summaries. */
  totalSummaryCount: DocCount;
}

/** Represents the current state and associated data for an Uptime monitor. */
export interface MonitorSummary {
  /** The ID assigned by the config or generated by the user. */
  monitor_id: string;
  /** The state of the monitor and its associated details. */
  state: State;

  histogram?: Maybe<SummaryHistogram>;
}

/** Unifies the subsequent data for an uptime monitor. */
export interface State {
  /** The agent processing the monitor. */
  agent?: Maybe<Agent>;
  /** There is a check object for each instance of the monitoring agent. */
  checks?: Maybe<Check[]>;

  geo?: Maybe<StateGeo>;

  observer?: Maybe<StateObserver>;

  monitor?: Maybe<MonitorState>;

  summary: Summary;

  timestamp: UnsignedInteger;
  /** Transport encryption information. */
  tls?: Maybe<(Maybe<StateTls>)[]>;

  url?: Maybe<StateUrl>;
}

export interface Agent {
  id: string;
}

export interface Check {
  agent?: Maybe<Agent>;

  container?: Maybe<StateContainer>;

  kubernetes?: Maybe<StateKubernetes>;

  monitor: CheckMonitor;

  observer?: Maybe<CheckObserver>;

  timestamp: string;
}

export interface StateContainer {
  id?: Maybe<string>;
}

export interface StateKubernetes {
  pod?: Maybe<StatePod>;
}

export interface StatePod {
  uid?: Maybe<string>;
}

export interface CheckMonitor {
  ip?: Maybe<string>;

  name?: Maybe<string>;

  status: string;
}

export interface CheckObserver {
  geo?: Maybe<CheckGeo>;
}

export interface StateGeo {
  name?: Maybe<(Maybe<string>)[]>;

  location?: Maybe<Location>;
}

export interface StateObserver {
  geo?: Maybe<StateGeo>;
}

export interface MonitorState {
  status?: Maybe<string>;

  name?: Maybe<string>;

  id?: Maybe<string>;

  type?: Maybe<string>;
}

/** Contains monitor transmission encryption information. */
export interface StateTls {
  /** The date and time after which the certificate is invalid. */
  certificate_not_valid_after?: Maybe<string>;

  certificate_not_valid_before?: Maybe<string>;

  certificates?: Maybe<string>;

  rtt?: Maybe<Rtt>;
}

export interface StateUrl {
  domain?: Maybe<string>;

  full?: Maybe<string>;

  path?: Maybe<string>;

  port?: Maybe<number>;

  scheme?: Maybe<string>;
}

/** Monitor status data over time. */
export interface SummaryHistogram {
  /** The number of documents used to assemble the histogram. */
  count: number;
  /** The individual histogram data points. */
  points: SummaryHistogramPoint[];
}

/** Represents a monitor's statuses for a period of time. */
export interface SummaryHistogramPoint {
  /** The time at which these data were collected. */
  timestamp: UnsignedInteger;
  /** The number of _up_ documents. */
  up: number;
  /** The number of _down_ documents. */
  down: number;
}

/** Represents the current status of the uptime index. */
export interface StatesIndexStatus {
  /** Flag denoting whether the index exists. */
  indexExists: boolean;
  /** The number of documents in the index. */
  docCount?: Maybe<DocCount>;
}

export interface DataPoint {
  x?: Maybe<UnsignedInteger>;

  y?: Maybe<number>;
}

/** Represents a monitor's duration performance in microseconds at a point in time. */
export interface MonitorDurationAreaPoint {
  /** The timeseries value for this point in time. */
  x: UnsignedInteger;
  /** The min duration value in microseconds at this time. */
  yMin?: Maybe<number>;
  /** The max duration value in microseconds at this point. */
  yMax?: Maybe<number>;
}

export interface MonitorSummaryUrl {
  domain?: Maybe<string>;

  fragment?: Maybe<string>;

  full?: Maybe<string>;

  original?: Maybe<string>;

  password?: Maybe<string>;

  path?: Maybe<string>;

  port?: Maybe<number>;

  query?: Maybe<string>;

  scheme?: Maybe<string>;

  username?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface AllPingsQueryArgs {
  /** Optional: the direction to sort by. Accepts 'asc' and 'desc'. Defaults to 'desc'. */
  sort?: Maybe<string>;
  /** Optional: the number of results to return. */
  size?: Maybe<number>;
  /** Optional: the monitor ID filter. */
  monitorId?: Maybe<string>;
  /** Optional: the check status to filter by. */
  status?: Maybe<string>;
  /** The lower limit of the date range. */
  dateRangeStart: string;
  /** The upper limit of the date range. */
  dateRangeEnd: string;
  /** Optional: agent location to filter by. */
  location?: Maybe<string>;
}
export interface GetMonitorsQueryArgs {
  dateRangeStart: string;

  dateRangeEnd: string;

  filters?: Maybe<string>;

  statusFilter?: Maybe<string>;
}
export interface GetSnapshotQueryArgs {
  dateRangeStart: string;

  dateRangeEnd: string;

  filters?: Maybe<string>;

  statusFilter?: Maybe<string>;
}
export interface GetSnapshotHistogramQueryArgs {
  dateRangeStart: string;

  dateRangeEnd: string;

  filters?: Maybe<string>;

  statusFilter?: Maybe<string>;

  monitorId?: Maybe<string>;
}
export interface GetMonitorChartsDataQueryArgs {
  monitorId: string;

  dateRangeStart: string;

  dateRangeEnd: string;

  location?: Maybe<string>;
}
export interface GetLatestMonitorsQueryArgs {
  /** The lower limit of the date range. */
  dateRangeStart: string;
  /** The upper limit of the date range. */
  dateRangeEnd: string;
  /** Optional: a specific monitor ID filter. */
  monitorId?: Maybe<string>;
  /** Optional: a specific instance location filter. */
  location?: Maybe<string>;
}
export interface GetFilterBarQueryArgs {
  dateRangeStart: string;

  dateRangeEnd: string;
}
export interface GetMonitorPageTitleQueryArgs {
  monitorId: string;
}
export interface GetMonitorStatesQueryArgs {
  dateRangeStart: string;

  dateRangeEnd: string;

  pagination?: Maybe<string>;

  filters?: Maybe<string>;

  statusFilter?: Maybe<string>;
}

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, TContext = {}, Args = {}> =
  | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = {}> {
    /** Get a list of all recorded pings for all monitors */
    allPings?: AllPingsResolver<PingResults, TypeParent, TContext>;
    /** Gets the number of documents in the target index */
    getDocCount?: GetDocCountResolver<DocCount, TypeParent, TContext>;

    getMonitors?: GetMonitorsResolver<Maybe<LatestMonitorsResult>, TypeParent, TContext>;

    getSnapshot?: GetSnapshotResolver<Maybe<Snapshot>, TypeParent, TContext>;

    getSnapshotHistogram?: GetSnapshotHistogramResolver<
      Maybe<HistogramResult>,
      TypeParent,
      TContext
    >;

    getMonitorChartsData?: GetMonitorChartsDataResolver<Maybe<MonitorChart>, TypeParent, TContext>;
    /** Fetch the most recent event data for a monitor ID, date range, location. */
    getLatestMonitors?: GetLatestMonitorsResolver<Ping[], TypeParent, TContext>;

    getFilterBar?: GetFilterBarResolver<Maybe<FilterBar>, TypeParent, TContext>;

    getMonitorPageTitle?: GetMonitorPageTitleResolver<
      Maybe<MonitorPageTitle>,
      TypeParent,
      TContext
    >;
    /** Fetches the current state of Uptime monitors for the given parameters. */
    getMonitorStates?: GetMonitorStatesResolver<Maybe<MonitorSummaryResult>, TypeParent, TContext>;
    /** Fetches details about the uptime index. */
    getStatesIndexStatus?: GetStatesIndexStatusResolver<StatesIndexStatus, TypeParent, TContext>;
  }

  export type AllPingsResolver<R = PingResults, Parent = {}, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext,
    AllPingsArgs
  >;
  export interface AllPingsArgs {
    /** Optional: the direction to sort by. Accepts 'asc' and 'desc'. Defaults to 'desc'. */
    sort?: Maybe<string>;
    /** Optional: the number of results to return. */
    size?: Maybe<number>;
    /** Optional: the monitor ID filter. */
    monitorId?: Maybe<string>;
    /** Optional: the check status to filter by. */
    status?: Maybe<string>;
    /** The lower limit of the date range. */
    dateRangeStart: string;
    /** The upper limit of the date range. */
    dateRangeEnd: string;
    /** Optional: agent location to filter by. */
    location?: Maybe<string>;
  }

  export type GetDocCountResolver<R = DocCount, Parent = {}, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type GetMonitorsResolver<
    R = Maybe<LatestMonitorsResult>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetMonitorsArgs>;
  export interface GetMonitorsArgs {
    dateRangeStart: string;

    dateRangeEnd: string;

    filters?: Maybe<string>;

    statusFilter?: Maybe<string>;
  }

  export type GetSnapshotResolver<
    R = Maybe<Snapshot>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetSnapshotArgs>;
  export interface GetSnapshotArgs {
    dateRangeStart: string;

    dateRangeEnd: string;

    filters?: Maybe<string>;

    statusFilter?: Maybe<string>;
  }

  export type GetSnapshotHistogramResolver<
    R = Maybe<HistogramResult>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetSnapshotHistogramArgs>;
  export interface GetSnapshotHistogramArgs {
    dateRangeStart: string;

    dateRangeEnd: string;

    filters?: Maybe<string>;

    statusFilter?: Maybe<string>;

    monitorId?: Maybe<string>;
  }

  export type GetMonitorChartsDataResolver<
    R = Maybe<MonitorChart>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetMonitorChartsDataArgs>;
  export interface GetMonitorChartsDataArgs {
    monitorId: string;

    dateRangeStart: string;

    dateRangeEnd: string;

    location?: Maybe<string>;
  }

  export type GetLatestMonitorsResolver<
    R = Ping[],
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetLatestMonitorsArgs>;
  export interface GetLatestMonitorsArgs {
    /** The lower limit of the date range. */
    dateRangeStart: string;
    /** The upper limit of the date range. */
    dateRangeEnd: string;
    /** Optional: a specific monitor ID filter. */
    monitorId?: Maybe<string>;
    /** Optional: a specific instance location filter. */
    location?: Maybe<string>;
  }

  export type GetFilterBarResolver<
    R = Maybe<FilterBar>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetFilterBarArgs>;
  export interface GetFilterBarArgs {
    dateRangeStart: string;

    dateRangeEnd: string;
  }

  export type GetMonitorPageTitleResolver<
    R = Maybe<MonitorPageTitle>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetMonitorPageTitleArgs>;
  export interface GetMonitorPageTitleArgs {
    monitorId: string;
  }

  export type GetMonitorStatesResolver<
    R = Maybe<MonitorSummaryResult>,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext, GetMonitorStatesArgs>;
  export interface GetMonitorStatesArgs {
    dateRangeStart: string;

    dateRangeEnd: string;

    pagination?: Maybe<string>;

    filters?: Maybe<string>;

    statusFilter?: Maybe<string>;
  }

  export type GetStatesIndexStatusResolver<
    R = StatesIndexStatus,
    Parent = {},
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace PingResultsResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = PingResults> {
    /** Total number of matching pings */
    total?: TotalResolver<UnsignedInteger, TypeParent, TContext>;
    /** Unique list of all locations the query matched */
    locations?: LocationsResolver<string[], TypeParent, TContext>;
    /** List of pings */
    pings?: PingsResolver<Ping[], TypeParent, TContext>;
  }

  export type TotalResolver<
    R = UnsignedInteger,
    Parent = PingResults,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LocationsResolver<
    R = string[],
    Parent = PingResults,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PingsResolver<R = Ping[], Parent = PingResults, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}
/** A request sent from a monitor to a host */
export namespace PingResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Ping> {
    /** unique ID for this ping */
    id?: IdResolver<string, TypeParent, TContext>;
    /** The timestamp of the ping's creation */
    timestamp?: TimestampResolver<string, TypeParent, TContext>;
    /** The agent that recorded the ping */
    beat?: BeatResolver<Maybe<Beat>, TypeParent, TContext>;

    container?: ContainerResolver<Maybe<Container>, TypeParent, TContext>;

    docker?: DockerResolver<Maybe<Docker>, TypeParent, TContext>;

    ecs?: EcsResolver<Maybe<Ecs>, TypeParent, TContext>;

    error?: ErrorResolver<Maybe<Error>, TypeParent, TContext>;

    host?: HostResolver<Maybe<Host>, TypeParent, TContext>;

    http?: HttpResolver<Maybe<Http>, TypeParent, TContext>;

    icmp?: IcmpResolver<Maybe<Icmp>, TypeParent, TContext>;

    kubernetes?: KubernetesResolver<Maybe<Kubernetes>, TypeParent, TContext>;

    meta?: MetaResolver<Maybe<Meta>, TypeParent, TContext>;

    monitor?: MonitorResolver<Maybe<Monitor>, TypeParent, TContext>;

    observer?: ObserverResolver<Maybe<Observer>, TypeParent, TContext>;

    resolve?: ResolveResolver<Maybe<Resolve>, TypeParent, TContext>;

    socks5?: Socks5Resolver<Maybe<Socks5>, TypeParent, TContext>;

    summary?: SummaryResolver<Maybe<Summary>, TypeParent, TContext>;

    tags?: TagsResolver<Maybe<string>, TypeParent, TContext>;

    tcp?: TcpResolver<Maybe<Tcp>, TypeParent, TContext>;

    tls?: TlsResolver<Maybe<PingTls>, TypeParent, TContext>;

    url?: UrlResolver<Maybe<Url>, TypeParent, TContext>;
  }

  export type IdResolver<R = string, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type TimestampResolver<R = string, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type BeatResolver<R = Maybe<Beat>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ContainerResolver<
    R = Maybe<Container>,
    Parent = Ping,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DockerResolver<R = Maybe<Docker>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type EcsResolver<R = Maybe<Ecs>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ErrorResolver<R = Maybe<Error>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type HostResolver<R = Maybe<Host>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type HttpResolver<R = Maybe<Http>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type IcmpResolver<R = Maybe<Icmp>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type KubernetesResolver<
    R = Maybe<Kubernetes>,
    Parent = Ping,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type MetaResolver<R = Maybe<Meta>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type MonitorResolver<
    R = Maybe<Monitor>,
    Parent = Ping,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ObserverResolver<
    R = Maybe<Observer>,
    Parent = Ping,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ResolveResolver<
    R = Maybe<Resolve>,
    Parent = Ping,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type Socks5Resolver<R = Maybe<Socks5>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type SummaryResolver<
    R = Maybe<Summary>,
    Parent = Ping,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TagsResolver<R = Maybe<string>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type TcpResolver<R = Maybe<Tcp>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type TlsResolver<R = Maybe<PingTls>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type UrlResolver<R = Maybe<Url>, Parent = Ping, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}
/** An agent for recording a beat */
export namespace BeatResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Beat> {
    hostname?: HostnameResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    timezone?: TimezoneResolver<Maybe<string>, TypeParent, TContext>;

    type?: TypeResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type HostnameResolver<
    R = Maybe<string>,
    Parent = Beat,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<R = Maybe<string>, Parent = Beat, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type TimezoneResolver<
    R = Maybe<string>,
    Parent = Beat,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TypeResolver<R = Maybe<string>, Parent = Beat, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace ContainerResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Container> {
    id?: IdResolver<Maybe<string>, TypeParent, TContext>;

    image?: ImageResolver<Maybe<ContainerImage>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    runtime?: RuntimeResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = Container,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ImageResolver<
    R = Maybe<ContainerImage>,
    Parent = Container,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Container,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RuntimeResolver<
    R = Maybe<string>,
    Parent = Container,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace ContainerImageResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = ContainerImage> {
    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    tag?: TagResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = ContainerImage,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TagResolver<
    R = Maybe<string>,
    Parent = ContainerImage,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace DockerResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Docker> {
    id?: IdResolver<Maybe<string>, TypeParent, TContext>;

    image?: ImageResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type IdResolver<R = Maybe<string>, Parent = Docker, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ImageResolver<
    R = Maybe<string>,
    Parent = Docker,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<R = Maybe<string>, Parent = Docker, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace EcsResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Ecs> {
    version?: VersionResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type VersionResolver<R = Maybe<string>, Parent = Ecs, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace ErrorResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Error> {
    code?: CodeResolver<Maybe<number>, TypeParent, TContext>;

    message?: MessageResolver<Maybe<string>, TypeParent, TContext>;

    type?: TypeResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type CodeResolver<R = Maybe<number>, Parent = Error, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type MessageResolver<
    R = Maybe<string>,
    Parent = Error,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TypeResolver<R = Maybe<string>, Parent = Error, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace HostResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Host> {
    architecture?: ArchitectureResolver<Maybe<string>, TypeParent, TContext>;

    id?: IdResolver<Maybe<string>, TypeParent, TContext>;

    hostname?: HostnameResolver<Maybe<string>, TypeParent, TContext>;

    ip?: IpResolver<Maybe<string>, TypeParent, TContext>;

    mac?: MacResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    os?: OsResolver<Maybe<Os>, TypeParent, TContext>;
  }

  export type ArchitectureResolver<
    R = Maybe<string>,
    Parent = Host,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type IdResolver<R = Maybe<string>, Parent = Host, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type HostnameResolver<
    R = Maybe<string>,
    Parent = Host,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type IpResolver<R = Maybe<string>, Parent = Host, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type MacResolver<R = Maybe<string>, Parent = Host, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type NameResolver<R = Maybe<string>, Parent = Host, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type OsResolver<R = Maybe<Os>, Parent = Host, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace OsResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Os> {
    family?: FamilyResolver<Maybe<string>, TypeParent, TContext>;

    kernel?: KernelResolver<Maybe<string>, TypeParent, TContext>;

    platform?: PlatformResolver<Maybe<string>, TypeParent, TContext>;

    version?: VersionResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    build?: BuildResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type FamilyResolver<R = Maybe<string>, Parent = Os, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type KernelResolver<R = Maybe<string>, Parent = Os, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type PlatformResolver<R = Maybe<string>, Parent = Os, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type VersionResolver<R = Maybe<string>, Parent = Os, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type NameResolver<R = Maybe<string>, Parent = Os, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type BuildResolver<R = Maybe<string>, Parent = Os, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace HttpResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Http> {
    response?: ResponseResolver<Maybe<HttpResponse>, TypeParent, TContext>;

    rtt?: RttResolver<Maybe<HttpRtt>, TypeParent, TContext>;

    url?: UrlResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type ResponseResolver<
    R = Maybe<HttpResponse>,
    Parent = Http,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RttResolver<R = Maybe<HttpRtt>, Parent = Http, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type UrlResolver<R = Maybe<string>, Parent = Http, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace HttpResponseResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = HttpResponse> {
    status_code?: StatusCodeResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;

    body?: BodyResolver<Maybe<HttpBody>, TypeParent, TContext>;
  }

  export type StatusCodeResolver<
    R = Maybe<UnsignedInteger>,
    Parent = HttpResponse,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type BodyResolver<
    R = Maybe<HttpBody>,
    Parent = HttpResponse,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace HttpBodyResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = HttpBody> {
    /** Size of HTTP response body in bytes */
    bytes?: BytesResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;
    /** Hash of the HTTP response body */
    hash?: HashResolver<Maybe<string>, TypeParent, TContext>;
    /** Response body of the HTTP Response. May be truncated based on client settings. */
    content?: ContentResolver<Maybe<string>, TypeParent, TContext>;
    /** Byte length of the content string, taking into account multibyte chars. */
    content_bytes?: ContentBytesResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;
  }

  export type BytesResolver<
    R = Maybe<UnsignedInteger>,
    Parent = HttpBody,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type HashResolver<
    R = Maybe<string>,
    Parent = HttpBody,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ContentResolver<
    R = Maybe<string>,
    Parent = HttpBody,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ContentBytesResolver<
    R = Maybe<UnsignedInteger>,
    Parent = HttpBody,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace HttpRttResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = HttpRtt> {
    content?: ContentResolver<Maybe<Duration>, TypeParent, TContext>;

    response_header?: ResponseHeaderResolver<Maybe<Duration>, TypeParent, TContext>;

    total?: TotalResolver<Maybe<Duration>, TypeParent, TContext>;

    validate?: ValidateResolver<Maybe<Duration>, TypeParent, TContext>;

    validate_body?: ValidateBodyResolver<Maybe<Duration>, TypeParent, TContext>;

    write_request?: WriteRequestResolver<Maybe<Duration>, TypeParent, TContext>;
  }

  export type ContentResolver<
    R = Maybe<Duration>,
    Parent = HttpRtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ResponseHeaderResolver<
    R = Maybe<Duration>,
    Parent = HttpRtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TotalResolver<
    R = Maybe<Duration>,
    Parent = HttpRtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ValidateResolver<
    R = Maybe<Duration>,
    Parent = HttpRtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ValidateBodyResolver<
    R = Maybe<Duration>,
    Parent = HttpRtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type WriteRequestResolver<
    R = Maybe<Duration>,
    Parent = HttpRtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** The monitor's status for a ping */
export namespace DurationResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Duration> {
    us?: UsResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;
  }

  export type UsResolver<
    R = Maybe<UnsignedInteger>,
    Parent = Duration,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace IcmpResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Icmp> {
    requests?: RequestsResolver<Maybe<number>, TypeParent, TContext>;

    rtt?: RttResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type RequestsResolver<
    R = Maybe<number>,
    Parent = Icmp,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RttResolver<R = Maybe<number>, Parent = Icmp, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace KubernetesResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Kubernetes> {
    container?: ContainerResolver<Maybe<KubernetesContainer>, TypeParent, TContext>;

    namespace?: NamespaceResolver<Maybe<string>, TypeParent, TContext>;

    node?: NodeResolver<Maybe<KubernetesNode>, TypeParent, TContext>;

    pod?: PodResolver<Maybe<KubernetesPod>, TypeParent, TContext>;
  }

  export type ContainerResolver<
    R = Maybe<KubernetesContainer>,
    Parent = Kubernetes,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NamespaceResolver<
    R = Maybe<string>,
    Parent = Kubernetes,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NodeResolver<
    R = Maybe<KubernetesNode>,
    Parent = Kubernetes,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PodResolver<
    R = Maybe<KubernetesPod>,
    Parent = Kubernetes,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace KubernetesContainerResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = KubernetesContainer> {
    image?: ImageResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type ImageResolver<
    R = Maybe<string>,
    Parent = KubernetesContainer,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = KubernetesContainer,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace KubernetesNodeResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = KubernetesNode> {
    name?: NameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = KubernetesNode,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace KubernetesPodResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = KubernetesPod> {
    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    uid?: UidResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = KubernetesPod,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UidResolver<
    R = Maybe<string>,
    Parent = KubernetesPod,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MetaResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Meta> {
    cloud?: CloudResolver<Maybe<MetaCloud>, TypeParent, TContext>;
  }

  export type CloudResolver<
    R = Maybe<MetaCloud>,
    Parent = Meta,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MetaCloudResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MetaCloud> {
    availability_zone?: AvailabilityZoneResolver<Maybe<string>, TypeParent, TContext>;

    instance_id?: InstanceIdResolver<Maybe<string>, TypeParent, TContext>;

    instance_name?: InstanceNameResolver<Maybe<string>, TypeParent, TContext>;

    machine_type?: MachineTypeResolver<Maybe<string>, TypeParent, TContext>;

    project_id?: ProjectIdResolver<Maybe<string>, TypeParent, TContext>;

    provider?: ProviderResolver<Maybe<string>, TypeParent, TContext>;

    region?: RegionResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type AvailabilityZoneResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type InstanceIdResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type InstanceNameResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type MachineTypeResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ProjectIdResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ProviderResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RegionResolver<
    R = Maybe<string>,
    Parent = MetaCloud,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MonitorResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Monitor> {
    duration?: DurationResolver<Maybe<Duration>, TypeParent, TContext>;

    host?: HostResolver<Maybe<string>, TypeParent, TContext>;
    /** The id of the monitor */
    id?: IdResolver<Maybe<string>, TypeParent, TContext>;
    /** The IP pinged by the monitor */
    ip?: IpResolver<Maybe<string>, TypeParent, TContext>;
    /** The name of the protocol being monitored */
    name?: NameResolver<Maybe<string>, TypeParent, TContext>;
    /** The protocol scheme of the monitored host */
    scheme?: SchemeResolver<Maybe<string>, TypeParent, TContext>;
    /** The status of the monitored host */
    status?: StatusResolver<Maybe<string>, TypeParent, TContext>;
    /** The type of host being monitored */
    type?: TypeResolver<Maybe<string>, TypeParent, TContext>;

    check_group?: CheckGroupResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type DurationResolver<
    R = Maybe<Duration>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type HostResolver<
    R = Maybe<string>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type IdResolver<R = Maybe<string>, Parent = Monitor, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type IpResolver<R = Maybe<string>, Parent = Monitor, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type SchemeResolver<
    R = Maybe<string>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type StatusResolver<
    R = Maybe<string>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TypeResolver<
    R = Maybe<string>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CheckGroupResolver<
    R = Maybe<string>,
    Parent = Monitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Metadata added by a proccessor, which is specified in its configuration. */
export namespace ObserverResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Observer> {
    /** Geolocation data for the agent. */
    geo?: GeoResolver<Maybe<Geo>, TypeParent, TContext>;
  }

  export type GeoResolver<R = Maybe<Geo>, Parent = Observer, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}
/** Geolocation data added via processors to enrich events. */
export namespace GeoResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Geo> {
    /** Name of the city in which the agent is running. */
    city_name?: CityNameResolver<Maybe<string>, TypeParent, TContext>;
    /** The name of the continent on which the agent is running. */
    continent_name?: ContinentNameResolver<Maybe<string>, TypeParent, TContext>;
    /** ISO designation for the agent's country. */
    country_iso_code?: CountryIsoCodeResolver<Maybe<string>, TypeParent, TContext>;
    /** The name of the agent's country. */
    country_name?: CountryNameResolver<Maybe<string>, TypeParent, TContext>;
    /** The lat/long of the agent. */
    location?: LocationResolver<Maybe<string>, TypeParent, TContext>;
    /** A name for the host's location, e.g. 'us-east-1' or 'LAX'. */
    name?: NameResolver<Maybe<string>, TypeParent, TContext>;
    /** ISO designation of the agent's region. */
    region_iso_code?: RegionIsoCodeResolver<Maybe<string>, TypeParent, TContext>;
    /** Name of the region hosting the agent. */
    region_name?: RegionNameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type CityNameResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ContinentNameResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CountryIsoCodeResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CountryNameResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LocationResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<R = Maybe<string>, Parent = Geo, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type RegionIsoCodeResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RegionNameResolver<
    R = Maybe<string>,
    Parent = Geo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace ResolveResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Resolve> {
    host?: HostResolver<Maybe<string>, TypeParent, TContext>;

    ip?: IpResolver<Maybe<string>, TypeParent, TContext>;

    rtt?: RttResolver<Maybe<Duration>, TypeParent, TContext>;
  }

  export type HostResolver<
    R = Maybe<string>,
    Parent = Resolve,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type IpResolver<R = Maybe<string>, Parent = Resolve, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type RttResolver<
    R = Maybe<Duration>,
    Parent = Resolve,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace Socks5Resolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Socks5> {
    rtt?: RttResolver<Maybe<Rtt>, TypeParent, TContext>;
  }

  export type RttResolver<R = Maybe<Rtt>, Parent = Socks5, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace RttResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Rtt> {
    connect?: ConnectResolver<Maybe<Duration>, TypeParent, TContext>;

    handshake?: HandshakeResolver<Maybe<Duration>, TypeParent, TContext>;

    validate?: ValidateResolver<Maybe<Duration>, TypeParent, TContext>;
  }

  export type ConnectResolver<
    R = Maybe<Duration>,
    Parent = Rtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type HandshakeResolver<
    R = Maybe<Duration>,
    Parent = Rtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ValidateResolver<
    R = Maybe<Duration>,
    Parent = Rtt,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace SummaryResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Summary> {
    up?: UpResolver<Maybe<number>, TypeParent, TContext>;

    down?: DownResolver<Maybe<number>, TypeParent, TContext>;

    geo?: GeoResolver<Maybe<CheckGeo>, TypeParent, TContext>;
  }

  export type UpResolver<R = Maybe<number>, Parent = Summary, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type DownResolver<
    R = Maybe<number>,
    Parent = Summary,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type GeoResolver<
    R = Maybe<CheckGeo>,
    Parent = Summary,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace CheckGeoResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = CheckGeo> {
    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    location?: LocationResolver<Maybe<Location>, TypeParent, TContext>;
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = CheckGeo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LocationResolver<
    R = Maybe<Location>,
    Parent = CheckGeo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace LocationResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Location> {
    lat?: LatResolver<Maybe<number>, TypeParent, TContext>;

    lon?: LonResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type LatResolver<
    R = Maybe<number>,
    Parent = Location,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LonResolver<
    R = Maybe<number>,
    Parent = Location,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace TcpResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Tcp> {
    port?: PortResolver<Maybe<number>, TypeParent, TContext>;

    rtt?: RttResolver<Maybe<Rtt>, TypeParent, TContext>;
  }

  export type PortResolver<R = Maybe<number>, Parent = Tcp, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type RttResolver<R = Maybe<Rtt>, Parent = Tcp, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}
/** Contains monitor transmission encryption information. */
export namespace PingTlsResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = PingTls> {
    /** The date and time after which the certificate is invalid. */
    certificate_not_valid_after?: CertificateNotValidAfterResolver<
      Maybe<string>,
      TypeParent,
      TContext
    >;

    certificate_not_valid_before?: CertificateNotValidBeforeResolver<
      Maybe<string>,
      TypeParent,
      TContext
    >;

    certificates?: CertificatesResolver<Maybe<string>, TypeParent, TContext>;

    rtt?: RttResolver<Maybe<Rtt>, TypeParent, TContext>;
  }

  export type CertificateNotValidAfterResolver<
    R = Maybe<string>,
    Parent = PingTls,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CertificateNotValidBeforeResolver<
    R = Maybe<string>,
    Parent = PingTls,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CertificatesResolver<
    R = Maybe<string>,
    Parent = PingTls,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RttResolver<R = Maybe<Rtt>, Parent = PingTls, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace UrlResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Url> {
    full?: FullResolver<Maybe<string>, TypeParent, TContext>;

    scheme?: SchemeResolver<Maybe<string>, TypeParent, TContext>;

    domain?: DomainResolver<Maybe<string>, TypeParent, TContext>;

    port?: PortResolver<Maybe<number>, TypeParent, TContext>;

    path?: PathResolver<Maybe<string>, TypeParent, TContext>;

    query?: QueryResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type FullResolver<R = Maybe<string>, Parent = Url, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type SchemeResolver<R = Maybe<string>, Parent = Url, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type DomainResolver<R = Maybe<string>, Parent = Url, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type PortResolver<R = Maybe<number>, Parent = Url, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type PathResolver<R = Maybe<string>, Parent = Url, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type QueryResolver<R = Maybe<string>, Parent = Url, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace DocCountResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = DocCount> {
    count?: CountResolver<UnsignedInteger, TypeParent, TContext>;
  }

  export type CountResolver<
    R = UnsignedInteger,
    Parent = DocCount,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace LatestMonitorsResultResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = LatestMonitorsResult> {
    monitors?: MonitorsResolver<Maybe<LatestMonitor[]>, TypeParent, TContext>;
  }

  export type MonitorsResolver<
    R = Maybe<LatestMonitor[]>,
    Parent = LatestMonitorsResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Represents the latest recorded information about a monitor. */
export namespace LatestMonitorResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = LatestMonitor> {
    /** The ID of the monitor represented by this data. */
    id?: IdResolver<MonitorKey, TypeParent, TContext>;
    /** Information from the latest document. */
    ping?: PingResolver<Maybe<Ping>, TypeParent, TContext>;
    /** Buckets of recent up count status data. */
    upSeries?: UpSeriesResolver<Maybe<MonitorSeriesPoint[]>, TypeParent, TContext>;
    /** Buckets of recent down count status data. */
    downSeries?: DownSeriesResolver<Maybe<MonitorSeriesPoint[]>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = MonitorKey,
    Parent = LatestMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PingResolver<
    R = Maybe<Ping>,
    Parent = LatestMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UpSeriesResolver<
    R = Maybe<MonitorSeriesPoint[]>,
    Parent = LatestMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DownSeriesResolver<
    R = Maybe<MonitorSeriesPoint[]>,
    Parent = LatestMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MonitorKeyResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorKey> {
    key?: KeyResolver<string, TypeParent, TContext>;

    url?: UrlResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type KeyResolver<R = string, Parent = MonitorKey, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type UrlResolver<
    R = Maybe<string>,
    Parent = MonitorKey,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MonitorSeriesPointResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorSeriesPoint> {
    x?: XResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;

    y?: YResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type XResolver<
    R = Maybe<UnsignedInteger>,
    Parent = MonitorSeriesPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type YResolver<
    R = Maybe<number>,
    Parent = MonitorSeriesPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace SnapshotResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Snapshot> {
    counts?: CountsResolver<SnapshotCount, TypeParent, TContext>;
  }

  export type CountsResolver<
    R = SnapshotCount,
    Parent = Snapshot,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace SnapshotCountResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = SnapshotCount> {
    up?: UpResolver<number, TypeParent, TContext>;

    down?: DownResolver<number, TypeParent, TContext>;

    mixed?: MixedResolver<number, TypeParent, TContext>;

    total?: TotalResolver<number, TypeParent, TContext>;
  }

  export type UpResolver<R = number, Parent = SnapshotCount, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type DownResolver<R = number, Parent = SnapshotCount, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type MixedResolver<
    R = number,
    Parent = SnapshotCount,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TotalResolver<
    R = number,
    Parent = SnapshotCount,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace HistogramResultResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = HistogramResult> {
    histogram?: HistogramResolver<(Maybe<HistogramDataPoint>)[], TypeParent, TContext>;

    interval?: IntervalResolver<UnsignedInteger, TypeParent, TContext>;
  }

  export type HistogramResolver<
    R = (Maybe<HistogramDataPoint>)[],
    Parent = HistogramResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type IntervalResolver<
    R = UnsignedInteger,
    Parent = HistogramResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace HistogramDataPointResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = HistogramDataPoint> {
    upCount?: UpCountResolver<Maybe<number>, TypeParent, TContext>;

    downCount?: DownCountResolver<Maybe<number>, TypeParent, TContext>;

    x?: XResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;

    x0?: X0Resolver<Maybe<UnsignedInteger>, TypeParent, TContext>;

    y?: YResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;
  }

  export type UpCountResolver<
    R = Maybe<number>,
    Parent = HistogramDataPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DownCountResolver<
    R = Maybe<number>,
    Parent = HistogramDataPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type XResolver<
    R = Maybe<UnsignedInteger>,
    Parent = HistogramDataPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type X0Resolver<
    R = Maybe<UnsignedInteger>,
    Parent = HistogramDataPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type YResolver<
    R = Maybe<UnsignedInteger>,
    Parent = HistogramDataPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** The data used to populate the monitor charts. */
export namespace MonitorChartResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorChart> {
    /** The average values for the monitor duration. */
    locationDurationLines?: LocationDurationLinesResolver<
      LocationDurationLine[],
      TypeParent,
      TContext
    >;
    /** The counts of up/down checks for the monitor. */
    status?: StatusResolver<StatusData[], TypeParent, TContext>;
    /** The maximum status doc count in this chart. */
    statusMaxCount?: StatusMaxCountResolver<number, TypeParent, TContext>;
    /** The maximum duration value in this chart. */
    durationMaxValue?: DurationMaxValueResolver<number, TypeParent, TContext>;
  }

  export type LocationDurationLinesResolver<
    R = LocationDurationLine[],
    Parent = MonitorChart,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type StatusResolver<
    R = StatusData[],
    Parent = MonitorChart,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type StatusMaxCountResolver<
    R = number,
    Parent = MonitorChart,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DurationMaxValueResolver<
    R = number,
    Parent = MonitorChart,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace LocationDurationLineResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = LocationDurationLine> {
    name?: NameResolver<string, TypeParent, TContext>;

    line?: LineResolver<MonitorDurationAveragePoint[], TypeParent, TContext>;
  }

  export type NameResolver<
    R = string,
    Parent = LocationDurationLine,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LineResolver<
    R = MonitorDurationAveragePoint[],
    Parent = LocationDurationLine,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Represents the average monitor duration ms at a point in time. */
export namespace MonitorDurationAveragePointResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorDurationAveragePoint> {
    /** The timeseries value for this point. */
    x?: XResolver<UnsignedInteger, TypeParent, TContext>;
    /** The average duration ms for the monitor. */
    y?: YResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type XResolver<
    R = UnsignedInteger,
    Parent = MonitorDurationAveragePoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type YResolver<
    R = Maybe<number>,
    Parent = MonitorDurationAveragePoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Represents a bucket of monitor status information. */
export namespace StatusDataResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StatusData> {
    /** The timeseries point for this status data. */
    x?: XResolver<UnsignedInteger, TypeParent, TContext>;
    /** The value of up counts for this point. */
    up?: UpResolver<Maybe<number>, TypeParent, TContext>;
    /** The value for down counts for this point. */
    down?: DownResolver<Maybe<number>, TypeParent, TContext>;
    /** The total down counts for this point. */
    total?: TotalResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type XResolver<
    R = UnsignedInteger,
    Parent = StatusData,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UpResolver<
    R = Maybe<number>,
    Parent = StatusData,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DownResolver<
    R = Maybe<number>,
    Parent = StatusData,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TotalResolver<
    R = Maybe<number>,
    Parent = StatusData,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** The data used to enrich the filter bar. */
export namespace FilterBarResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = FilterBar> {
    /** A series of monitor IDs in the heartbeat indices. */
    ids?: IdsResolver<Maybe<string[]>, TypeParent, TContext>;
    /** The location values users have configured for the agents. */
    locations?: LocationsResolver<Maybe<string[]>, TypeParent, TContext>;
    /** The ports of the monitored endpoints. */
    ports?: PortsResolver<Maybe<number[]>, TypeParent, TContext>;
    /** The schemes used by the monitors. */
    schemes?: SchemesResolver<Maybe<string[]>, TypeParent, TContext>;
    /** The possible status values contained in the indices. */
    statuses?: StatusesResolver<Maybe<string[]>, TypeParent, TContext>;
    /** The list of URLs */
    urls?: UrlsResolver<Maybe<string[]>, TypeParent, TContext>;
  }

  export type IdsResolver<
    R = Maybe<string[]>,
    Parent = FilterBar,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LocationsResolver<
    R = Maybe<string[]>,
    Parent = FilterBar,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PortsResolver<
    R = Maybe<number[]>,
    Parent = FilterBar,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type SchemesResolver<
    R = Maybe<string[]>,
    Parent = FilterBar,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type StatusesResolver<
    R = Maybe<string[]>,
    Parent = FilterBar,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UrlsResolver<
    R = Maybe<string[]>,
    Parent = FilterBar,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MonitorPageTitleResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorPageTitle> {
    id?: IdResolver<string, TypeParent, TContext>;

    url?: UrlResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = MonitorPageTitle,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UrlResolver<
    R = Maybe<string>,
    Parent = MonitorPageTitle,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = MonitorPageTitle,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** The primary object returned for monitor states. */
export namespace MonitorSummaryResultResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorSummaryResult> {
    /** Used to go to the next page of results */
    prevPagePagination?: PrevPagePaginationResolver<Maybe<string>, TypeParent, TContext>;
    /** Used to go to the previous page of results */
    nextPagePagination?: NextPagePaginationResolver<Maybe<string>, TypeParent, TContext>;
    /** The objects representing the state of a series of heartbeat monitors. */
    summaries?: SummariesResolver<Maybe<MonitorSummary[]>, TypeParent, TContext>;
    /** The number of summaries. */
    totalSummaryCount?: TotalSummaryCountResolver<DocCount, TypeParent, TContext>;
  }

  export type PrevPagePaginationResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NextPagePaginationResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type SummariesResolver<
    R = Maybe<MonitorSummary[]>,
    Parent = MonitorSummaryResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TotalSummaryCountResolver<
    R = DocCount,
    Parent = MonitorSummaryResult,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Represents the current state and associated data for an Uptime monitor. */
export namespace MonitorSummaryResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorSummary> {
    /** The ID assigned by the config or generated by the user. */
    monitor_id?: MonitorIdResolver<string, TypeParent, TContext>;
    /** The state of the monitor and its associated details. */
    state?: StateResolver<State, TypeParent, TContext>;

    histogram?: HistogramResolver<Maybe<SummaryHistogram>, TypeParent, TContext>;
  }

  export type MonitorIdResolver<
    R = string,
    Parent = MonitorSummary,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type StateResolver<
    R = State,
    Parent = MonitorSummary,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type HistogramResolver<
    R = Maybe<SummaryHistogram>,
    Parent = MonitorSummary,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Unifies the subsequent data for an uptime monitor. */
export namespace StateResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = State> {
    /** The agent processing the monitor. */
    agent?: AgentResolver<Maybe<Agent>, TypeParent, TContext>;
    /** There is a check object for each instance of the monitoring agent. */
    checks?: ChecksResolver<Maybe<Check[]>, TypeParent, TContext>;

    geo?: GeoResolver<Maybe<StateGeo>, TypeParent, TContext>;

    observer?: ObserverResolver<Maybe<StateObserver>, TypeParent, TContext>;

    monitor?: MonitorResolver<Maybe<MonitorState>, TypeParent, TContext>;

    summary?: SummaryResolver<Summary, TypeParent, TContext>;

    timestamp?: TimestampResolver<UnsignedInteger, TypeParent, TContext>;
    /** Transport encryption information. */
    tls?: TlsResolver<Maybe<(Maybe<StateTls>)[]>, TypeParent, TContext>;

    url?: UrlResolver<Maybe<StateUrl>, TypeParent, TContext>;
  }

  export type AgentResolver<R = Maybe<Agent>, Parent = State, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ChecksResolver<
    R = Maybe<Check[]>,
    Parent = State,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type GeoResolver<R = Maybe<StateGeo>, Parent = State, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ObserverResolver<
    R = Maybe<StateObserver>,
    Parent = State,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type MonitorResolver<
    R = Maybe<MonitorState>,
    Parent = State,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type SummaryResolver<R = Summary, Parent = State, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type TimestampResolver<
    R = UnsignedInteger,
    Parent = State,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TlsResolver<
    R = Maybe<(Maybe<StateTls>)[]>,
    Parent = State,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UrlResolver<R = Maybe<StateUrl>, Parent = State, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace AgentResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Agent> {
    id?: IdResolver<string, TypeParent, TContext>;
  }

  export type IdResolver<R = string, Parent = Agent, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace CheckResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = Check> {
    agent?: AgentResolver<Maybe<Agent>, TypeParent, TContext>;

    container?: ContainerResolver<Maybe<StateContainer>, TypeParent, TContext>;

    kubernetes?: KubernetesResolver<Maybe<StateKubernetes>, TypeParent, TContext>;

    monitor?: MonitorResolver<CheckMonitor, TypeParent, TContext>;

    observer?: ObserverResolver<Maybe<CheckObserver>, TypeParent, TContext>;

    timestamp?: TimestampResolver<string, TypeParent, TContext>;
  }

  export type AgentResolver<R = Maybe<Agent>, Parent = Check, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ContainerResolver<
    R = Maybe<StateContainer>,
    Parent = Check,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type KubernetesResolver<
    R = Maybe<StateKubernetes>,
    Parent = Check,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type MonitorResolver<
    R = CheckMonitor,
    Parent = Check,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type ObserverResolver<
    R = Maybe<CheckObserver>,
    Parent = Check,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TimestampResolver<R = string, Parent = Check, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace StateContainerResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StateContainer> {
    id?: IdResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = StateContainer,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace StateKubernetesResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StateKubernetes> {
    pod?: PodResolver<Maybe<StatePod>, TypeParent, TContext>;
  }

  export type PodResolver<
    R = Maybe<StatePod>,
    Parent = StateKubernetes,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace StatePodResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StatePod> {
    uid?: UidResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type UidResolver<
    R = Maybe<string>,
    Parent = StatePod,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace CheckMonitorResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = CheckMonitor> {
    ip?: IpResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    status?: StatusResolver<string, TypeParent, TContext>;
  }

  export type IpResolver<
    R = Maybe<string>,
    Parent = CheckMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = CheckMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type StatusResolver<
    R = string,
    Parent = CheckMonitor,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace CheckObserverResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = CheckObserver> {
    geo?: GeoResolver<Maybe<CheckGeo>, TypeParent, TContext>;
  }

  export type GeoResolver<
    R = Maybe<CheckGeo>,
    Parent = CheckObserver,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace StateGeoResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StateGeo> {
    name?: NameResolver<Maybe<(Maybe<string>)[]>, TypeParent, TContext>;

    location?: LocationResolver<Maybe<Location>, TypeParent, TContext>;
  }

  export type NameResolver<
    R = Maybe<(Maybe<string>)[]>,
    Parent = StateGeo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type LocationResolver<
    R = Maybe<Location>,
    Parent = StateGeo,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace StateObserverResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StateObserver> {
    geo?: GeoResolver<Maybe<StateGeo>, TypeParent, TContext>;
  }

  export type GeoResolver<
    R = Maybe<StateGeo>,
    Parent = StateObserver,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MonitorStateResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorState> {
    status?: StatusResolver<Maybe<string>, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    id?: IdResolver<Maybe<string>, TypeParent, TContext>;

    type?: TypeResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type StatusResolver<
    R = Maybe<string>,
    Parent = MonitorState,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = MonitorState,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type IdResolver<
    R = Maybe<string>,
    Parent = MonitorState,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type TypeResolver<
    R = Maybe<string>,
    Parent = MonitorState,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Contains monitor transmission encryption information. */
export namespace StateTlsResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StateTls> {
    /** The date and time after which the certificate is invalid. */
    certificate_not_valid_after?: CertificateNotValidAfterResolver<
      Maybe<string>,
      TypeParent,
      TContext
    >;

    certificate_not_valid_before?: CertificateNotValidBeforeResolver<
      Maybe<string>,
      TypeParent,
      TContext
    >;

    certificates?: CertificatesResolver<Maybe<string>, TypeParent, TContext>;

    rtt?: RttResolver<Maybe<Rtt>, TypeParent, TContext>;
  }

  export type CertificateNotValidAfterResolver<
    R = Maybe<string>,
    Parent = StateTls,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CertificateNotValidBeforeResolver<
    R = Maybe<string>,
    Parent = StateTls,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type CertificatesResolver<
    R = Maybe<string>,
    Parent = StateTls,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type RttResolver<R = Maybe<Rtt>, Parent = StateTls, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace StateUrlResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StateUrl> {
    domain?: DomainResolver<Maybe<string>, TypeParent, TContext>;

    full?: FullResolver<Maybe<string>, TypeParent, TContext>;

    path?: PathResolver<Maybe<string>, TypeParent, TContext>;

    port?: PortResolver<Maybe<number>, TypeParent, TContext>;

    scheme?: SchemeResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type DomainResolver<
    R = Maybe<string>,
    Parent = StateUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type FullResolver<
    R = Maybe<string>,
    Parent = StateUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PathResolver<
    R = Maybe<string>,
    Parent = StateUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PortResolver<
    R = Maybe<number>,
    Parent = StateUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type SchemeResolver<
    R = Maybe<string>,
    Parent = StateUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Monitor status data over time. */
export namespace SummaryHistogramResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = SummaryHistogram> {
    /** The number of documents used to assemble the histogram. */
    count?: CountResolver<number, TypeParent, TContext>;
    /** The individual histogram data points. */
    points?: PointsResolver<SummaryHistogramPoint[], TypeParent, TContext>;
  }

  export type CountResolver<
    R = number,
    Parent = SummaryHistogram,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PointsResolver<
    R = SummaryHistogramPoint[],
    Parent = SummaryHistogram,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Represents a monitor's statuses for a period of time. */
export namespace SummaryHistogramPointResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = SummaryHistogramPoint> {
    /** The time at which these data were collected. */
    timestamp?: TimestampResolver<UnsignedInteger, TypeParent, TContext>;
    /** The number of _up_ documents. */
    up?: UpResolver<number, TypeParent, TContext>;
    /** The number of _down_ documents. */
    down?: DownResolver<number, TypeParent, TContext>;
  }

  export type TimestampResolver<
    R = UnsignedInteger,
    Parent = SummaryHistogramPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UpResolver<
    R = number,
    Parent = SummaryHistogramPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DownResolver<
    R = number,
    Parent = SummaryHistogramPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}
/** Represents the current status of the uptime index. */
export namespace StatesIndexStatusResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = StatesIndexStatus> {
    /** Flag denoting whether the index exists. */
    indexExists?: IndexExistsResolver<boolean, TypeParent, TContext>;
    /** The number of documents in the index. */
    docCount?: DocCountResolver<Maybe<DocCount>, TypeParent, TContext>;
  }

  export type IndexExistsResolver<
    R = boolean,
    Parent = StatesIndexStatus,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type DocCountResolver<
    R = Maybe<DocCount>,
    Parent = StatesIndexStatus,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace DataPointResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = DataPoint> {
    x?: XResolver<Maybe<UnsignedInteger>, TypeParent, TContext>;

    y?: YResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type XResolver<
    R = Maybe<UnsignedInteger>,
    Parent = DataPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type YResolver<R = Maybe<number>, Parent = DataPoint, TContext = UptimeContext> = Resolver<
    R,
    Parent,
    TContext
  >;
}
/** Represents a monitor's duration performance in microseconds at a point in time. */
export namespace MonitorDurationAreaPointResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorDurationAreaPoint> {
    /** The timeseries value for this point in time. */
    x?: XResolver<UnsignedInteger, TypeParent, TContext>;
    /** The min duration value in microseconds at this time. */
    yMin?: YMinResolver<Maybe<number>, TypeParent, TContext>;
    /** The max duration value in microseconds at this point. */
    yMax?: YMaxResolver<Maybe<number>, TypeParent, TContext>;
  }

  export type XResolver<
    R = UnsignedInteger,
    Parent = MonitorDurationAreaPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type YMinResolver<
    R = Maybe<number>,
    Parent = MonitorDurationAreaPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type YMaxResolver<
    R = Maybe<number>,
    Parent = MonitorDurationAreaPoint,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MonitorSummaryUrlResolvers {
  export interface Resolvers<TContext = UptimeContext, TypeParent = MonitorSummaryUrl> {
    domain?: DomainResolver<Maybe<string>, TypeParent, TContext>;

    fragment?: FragmentResolver<Maybe<string>, TypeParent, TContext>;

    full?: FullResolver<Maybe<string>, TypeParent, TContext>;

    original?: OriginalResolver<Maybe<string>, TypeParent, TContext>;

    password?: PasswordResolver<Maybe<string>, TypeParent, TContext>;

    path?: PathResolver<Maybe<string>, TypeParent, TContext>;

    port?: PortResolver<Maybe<number>, TypeParent, TContext>;

    query?: QueryResolver<Maybe<string>, TypeParent, TContext>;

    scheme?: SchemeResolver<Maybe<string>, TypeParent, TContext>;

    username?: UsernameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type DomainResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type FragmentResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type FullResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type OriginalResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PasswordResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PathResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type PortResolver<
    R = Maybe<number>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type QueryResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type SchemeResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
  export type UsernameResolver<
    R = Maybe<string>,
    Parent = MonitorSummaryUrl,
    TContext = UptimeContext
  > = Resolver<R, Parent, TContext>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  UptimeContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  UptimeContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  UptimeContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/). */
  reason?: string;
}

export interface UnsignedIntegerScalarConfig extends GraphQLScalarTypeConfig<UnsignedInteger, any> {
  name: 'UnsignedInteger';
}

export type IResolvers<TContext = UptimeContext> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  PingResults?: PingResultsResolvers.Resolvers<TContext>;
  Ping?: PingResolvers.Resolvers<TContext>;
  Beat?: BeatResolvers.Resolvers<TContext>;
  Container?: ContainerResolvers.Resolvers<TContext>;
  ContainerImage?: ContainerImageResolvers.Resolvers<TContext>;
  Docker?: DockerResolvers.Resolvers<TContext>;
  Ecs?: EcsResolvers.Resolvers<TContext>;
  Error?: ErrorResolvers.Resolvers<TContext>;
  Host?: HostResolvers.Resolvers<TContext>;
  Os?: OsResolvers.Resolvers<TContext>;
  Http?: HttpResolvers.Resolvers<TContext>;
  HttpResponse?: HttpResponseResolvers.Resolvers<TContext>;
  HttpBody?: HttpBodyResolvers.Resolvers<TContext>;
  HttpRtt?: HttpRttResolvers.Resolvers<TContext>;
  Duration?: DurationResolvers.Resolvers<TContext>;
  Icmp?: IcmpResolvers.Resolvers<TContext>;
  Kubernetes?: KubernetesResolvers.Resolvers<TContext>;
  KubernetesContainer?: KubernetesContainerResolvers.Resolvers<TContext>;
  KubernetesNode?: KubernetesNodeResolvers.Resolvers<TContext>;
  KubernetesPod?: KubernetesPodResolvers.Resolvers<TContext>;
  Meta?: MetaResolvers.Resolvers<TContext>;
  MetaCloud?: MetaCloudResolvers.Resolvers<TContext>;
  Monitor?: MonitorResolvers.Resolvers<TContext>;
  Observer?: ObserverResolvers.Resolvers<TContext>;
  Geo?: GeoResolvers.Resolvers<TContext>;
  Resolve?: ResolveResolvers.Resolvers<TContext>;
  Socks5?: Socks5Resolvers.Resolvers<TContext>;
  Rtt?: RttResolvers.Resolvers<TContext>;
  Summary?: SummaryResolvers.Resolvers<TContext>;
  CheckGeo?: CheckGeoResolvers.Resolvers<TContext>;
  Location?: LocationResolvers.Resolvers<TContext>;
  Tcp?: TcpResolvers.Resolvers<TContext>;
  PingTls?: PingTlsResolvers.Resolvers<TContext>;
  Url?: UrlResolvers.Resolvers<TContext>;
  DocCount?: DocCountResolvers.Resolvers<TContext>;
  LatestMonitorsResult?: LatestMonitorsResultResolvers.Resolvers<TContext>;
  LatestMonitor?: LatestMonitorResolvers.Resolvers<TContext>;
  MonitorKey?: MonitorKeyResolvers.Resolvers<TContext>;
  MonitorSeriesPoint?: MonitorSeriesPointResolvers.Resolvers<TContext>;
  Snapshot?: SnapshotResolvers.Resolvers<TContext>;
  SnapshotCount?: SnapshotCountResolvers.Resolvers<TContext>;
  HistogramResult?: HistogramResultResolvers.Resolvers<TContext>;
  HistogramDataPoint?: HistogramDataPointResolvers.Resolvers<TContext>;
  MonitorChart?: MonitorChartResolvers.Resolvers<TContext>;
  LocationDurationLine?: LocationDurationLineResolvers.Resolvers<TContext>;
  MonitorDurationAveragePoint?: MonitorDurationAveragePointResolvers.Resolvers<TContext>;
  StatusData?: StatusDataResolvers.Resolvers<TContext>;
  FilterBar?: FilterBarResolvers.Resolvers<TContext>;
  MonitorPageTitle?: MonitorPageTitleResolvers.Resolvers<TContext>;
  MonitorSummaryResult?: MonitorSummaryResultResolvers.Resolvers<TContext>;
  MonitorSummary?: MonitorSummaryResolvers.Resolvers<TContext>;
  State?: StateResolvers.Resolvers<TContext>;
  Agent?: AgentResolvers.Resolvers<TContext>;
  Check?: CheckResolvers.Resolvers<TContext>;
  StateContainer?: StateContainerResolvers.Resolvers<TContext>;
  StateKubernetes?: StateKubernetesResolvers.Resolvers<TContext>;
  StatePod?: StatePodResolvers.Resolvers<TContext>;
  CheckMonitor?: CheckMonitorResolvers.Resolvers<TContext>;
  CheckObserver?: CheckObserverResolvers.Resolvers<TContext>;
  StateGeo?: StateGeoResolvers.Resolvers<TContext>;
  StateObserver?: StateObserverResolvers.Resolvers<TContext>;
  MonitorState?: MonitorStateResolvers.Resolvers<TContext>;
  StateTls?: StateTlsResolvers.Resolvers<TContext>;
  StateUrl?: StateUrlResolvers.Resolvers<TContext>;
  SummaryHistogram?: SummaryHistogramResolvers.Resolvers<TContext>;
  SummaryHistogramPoint?: SummaryHistogramPointResolvers.Resolvers<TContext>;
  StatesIndexStatus?: StatesIndexStatusResolvers.Resolvers<TContext>;
  DataPoint?: DataPointResolvers.Resolvers<TContext>;
  MonitorDurationAreaPoint?: MonitorDurationAreaPointResolvers.Resolvers<TContext>;
  MonitorSummaryUrl?: MonitorSummaryUrlResolvers.Resolvers<TContext>;
  UnsignedInteger?: GraphQLScalarType;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
