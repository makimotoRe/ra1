import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Grid, GridProps, SvgIconTypeMap } from "@mui/material";
import { Item } from "../../../features/dashboard/source/initialItems";
import { BaseSortableItem } from "../Dnd/BaseSortableItem";
import { useItems } from "../../hooks/useItems";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactElement } from "react";

export const BaseDndContext: React.FC<SortableDashboard> = ({
  children,
  props,
  isVisible = true,
  gridContainerProps = { spacing: 2 },
}) => {
  const { items, setItems } = useItems();

  // handleDragEnd関数の定義
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid container {...gridContainerProps}>
          {items.map(
            (item: Item, index) =>
              item.isVisible == isVisible && (
                <BaseSortableItem
                  key={item.id}
                  item={item}
                  index={index}
                  handler={props?.handler}
                  text={props?.text}
                  Icon={props?.Icon}
                  style={props?.style}
                  gridProps={props?.gridProps}
                >
                  {children(item)}
                </BaseSortableItem>
              )
          )}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

interface GridContainerProps {
  spacing?: number;
  style?: React.CSSProperties;
}

interface RestBaseSortableItemProps {
  handler?: (id: string) => void;
  text?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  style?: React.CSSProperties;
  gridProps?: GridProps;
  children?: ReactElement;
}

interface SortableDashboard {
  children: (item: Item) => React.ReactElement;
  gridContainerProps?: GridContainerProps;
  props?: RestBaseSortableItemProps;
  isVisible?: boolean;
}
