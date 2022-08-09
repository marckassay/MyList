import { renderHook } from "@testing-library/react";
import { useAppStore } from "./App.store";

describe("State behavior", () => {
  // @see https://github.com/pmndrs/zustand/issues/905#issuecomment-1096019094
  const initialStoreState = useAppStore.getState();

  beforeEach(() => {
    useAppStore.setState(initialStoreState, true);
  });

  it("should remove item from 'confirm/proceed to trash' action", async () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.list.items).toHaveLength(3);
    const item = result.current.list.items?.slice(0, 1)[0];

    await result.current.dispatch({
      type: "confirm/proceed to trash",
      payload: item,
    });

    expect(result.current.list.items).not.toContain(item);
  });

  it("should not remove item from 'confirm/abort trash' action", async () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.list.items).toHaveLength(3);
    const item = result.current.list.items?.slice(0, 1)[0];

    await result.current.dispatch({
      type: "confirm/abort trash",
      payload: item,
    });

    expect(result.current.list.items).toContain(item);
  });
});
