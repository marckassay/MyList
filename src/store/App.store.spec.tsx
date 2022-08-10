import { renderHook } from "@testing-library/react";
import { calculateGrandTotal } from "../../src/utils";
import { useAppStore } from "./App.store";

describe("State behavior", () => {
  const items = [
    { id: 111, name: "Apples", price: 6 },
    { id: 222, name: "Bread", price: 3 },
    { id: 333, name: "Watermelon", price: 7 },
  ];

  beforeEach(() => {
    useAppStore.setState({
      title: "",
      toolbar: {
        item: undefined,
      },
      list: {
        grandTotal: calculateGrandTotal(items),
        items,
      },
      confirm: {
        item: undefined,
      },
    });
  });

  it("should set toolbar.item from 'list/init edit item' action", async () => {
    const { result } = renderHook(() => useAppStore());

    const item = items[0];

    expect(result.current.toolbar.item).toBeUndefined();

    await result.current.dispatch({
      type: "list/init edit item",
      payload: item,
    });

    expect(result.current.toolbar.item).toBe(item);
  });

  it("should set confirm.item from 'list/confirm trash item' action", async () => {
    const { result } = renderHook(() => useAppStore());

    const item = items[0];

    expect(result.current.confirm.item).toBeUndefined();

    await result.current.dispatch({
      type: "list/confirm trash item",
      payload: item,
    });

    expect(result.current.confirm.item).toBe(item);
  });

  it("should not remove item from 'confirm/abort trash' action", async () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.list.items).toHaveLength(3);
    const item = items[0];

    await result.current.dispatch({
      type: "confirm/abort trash",
      payload: item,
    });

    expect(result.current.list.items).toContain(item);
  });

  it("should remove item from 'confirm/proceed to trash' action", async () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.list.items).toHaveLength(3);
    const item = items[0];

    await result.current.dispatch({
      type: "confirm/proceed to trash",
      payload: item,
    });

    expect(result.current.list.items).not.toContain(item);
  });
});
