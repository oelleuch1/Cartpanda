import {
  AddNodeUseCase,
  ConnectNodesUseCase,
  LoadFunnelUseCase,
  RemoveNodeUseCase,
  SaveFunnelUseCase,
  RemoveEdgeUseCase,
  MoveNodeUseCase,
  UndoLastUpdateUseCase,
  DownloadUseCase,
  FunnelState,
} from "../../../application";
import { LocalStorageFunnelRepository } from "../../../infrastructure";

class DependencyContainer {
  private static instance: DependencyContainer | null = null;

  readonly repository: LocalStorageFunnelRepository;
  readonly funnelState: FunnelState;
  readonly loadFunnel: LoadFunnelUseCase;
  readonly saveFunnel: SaveFunnelUseCase;
  readonly addNode: AddNodeUseCase;
  readonly moveNode: MoveNodeUseCase;
  readonly removeNode: RemoveNodeUseCase;
  readonly connectNodes: ConnectNodesUseCase;
  readonly removeEdge: RemoveEdgeUseCase;
  readonly undoLastUpdate: UndoLastUpdateUseCase;
  readonly downloadFunnel: DownloadUseCase;

  private constructor() {
    this.repository = new LocalStorageFunnelRepository();
    this.loadFunnel = new LoadFunnelUseCase(this.repository);

    const initialState = this.loadFunnel.execute();
    this.funnelState = new FunnelState(initialState);

    this.saveFunnel = new SaveFunnelUseCase(this.repository);
    this.addNode = new AddNodeUseCase();
    this.moveNode = new MoveNodeUseCase();
    this.removeNode = new RemoveNodeUseCase();
    this.connectNodes = new ConnectNodesUseCase();
    this.removeEdge = new RemoveEdgeUseCase();
    this.undoLastUpdate = new UndoLastUpdateUseCase(this.funnelState);
    this.downloadFunnel = new DownloadUseCase(this.funnelState);
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }
}

export function getAppDependencies() {
  return DependencyContainer.getInstance();
}
