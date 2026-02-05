import {DomainResult, Funnel} from "../../domain";

export class UndoLastOperationUseCase {

    execute(funnel: Funnel): DomainResult<void> {
        return funnel.undoLastUpdate()
    }
}