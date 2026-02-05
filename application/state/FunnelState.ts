import { Funnel } from "../../domain";
import { type FunnelDTO, FunnelMapper } from "../../infrastructure";

export class FunnelState {
  private current: Funnel;
  private readonly history: FunnelDTO[] = [];

  constructor(initial: Funnel) {
    this.current = initial;
  }

  getCurrent(): Funnel {
    return this.current;
  }

  /** Save a snapshot of current state before making changes */
  saveSnapshot(): void {
    this.history.push(FunnelMapper.toDTO(this.current));
  }

  update(next: Funnel): void {
    this.history.push(FunnelMapper.toDTO(this.current));
    this.current = next;
  }

  undo(): void {
    const snapshot = this.history.pop();
    if (!snapshot) return;

    this.current = FunnelMapper.toDomain(snapshot);
  }

  download(): void {
      const funnelConfig = JSON.stringify(this.getCurrent(), null, 2);
      const blob = new Blob([funnelConfig], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = 'funnel.json';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  }
}
