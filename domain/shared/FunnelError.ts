export enum FunnelErrorCode {
    NODE_NOT_FOUND = 'NODE_NOT_FOUND',
    CANNOT_HAVE_OUTGOING_EDGE = 'CANNOT_HAVE_OUTGOING_EDGE',
    EDGE_ALREADY_EXISTS = 'EDGE_ALREADY_EXISTS',
}

export type FunnelError = {
    code: FunnelErrorCode,
    message: string,
}

