import {
    AddNodeUseCase,
    ConnectNodesUseCase,
    LoadFunnelUseCase,
    RemoveNodeUseCase,
    SaveFunnelUseCase,
    RemoveEdgeUseCase,
    MoveNodeUseCase,
    UndoLastUpdateUseCase,
    FunnelState
} from "../../../application";
import { LocalStorageFunnelRepository } from "../../../infrastructure";

const repository = new LocalStorageFunnelRepository();
const loadFunnel = new LoadFunnelUseCase(repository);
const initialState = loadFunnel.execute();
const funnelState = new FunnelState(initialState);

export function getAppDependencies() {

    return {
        funnelState,
        loadFunnel: new LoadFunnelUseCase(repository),
        saveFunnel: new SaveFunnelUseCase(repository),
        addNode: new AddNodeUseCase(),
        moveNode: new MoveNodeUseCase(),
        removeNode: new RemoveNodeUseCase(),
        connectNodes: new ConnectNodesUseCase(),
        removeEdge: new RemoveEdgeUseCase(),
        undoLastUpdate: new UndoLastUpdateUseCase(funnelState),
    };
}
