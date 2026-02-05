import {FunnelError, FunnelErrorCode} from "./FunnelError";

export type DomainResult<T> =
    | { ok: true; value?: T; }
    | { ok: false; error: FunnelError };

export class DomainResultErrorFactory {
    static createFunnelError(code: FunnelErrorCode): DomainResult<void> {
        switch (code) {
            case FunnelErrorCode.NODE_NOT_FOUND:
                return { ok: false, error: { code, message: 'Node is not existing' } };
            case FunnelErrorCode.CANNOT_HAVE_OUTGOING_EDGE:
                return { ok: false, error: { code, message: 'Thank you cannot have outgoing edge' } }
            case FunnelErrorCode.EDGE_ALREADY_EXISTS:
                return { ok: false, error: { code, message: 'Edge is already existing' } }
            case FunnelErrorCode.NODE_CANNOT_BE_DUPLICATED:
                return { ok: false, error: { code, message: 'Node already exists with same type' } }
        }
    }
}