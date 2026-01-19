import React, { ReactElement } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
  styled,
  GridProps,
} from "@mui/material";
import { Item } from "../../../features/dashboard/source/initialItems";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const BaseSortableItem: React.FC<SortableItemProps> = ({
  item,
  handler,
  text,
  Icon,
  style,
  gridProps,
  children,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const gridStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <StyledGrid
      item
      xs={12}
      sm={6}
      md={3}
      ref={setNodeRef}
      style={gridStyle}
      {...attributes}
      {...gridProps}
    >
      <div className="ButtonDiv">
        {handler ? (
          <Button
            variant="text"
            type="button"
            onClick={(event) => {
              if (handler) handler(item.id);
            }}
            className="SortableButton"
          >
            {Icon && <Icon />}
          </Button>
        ) : null}
        <Card style={style} {...listeners} className="SortableCard">
          <CardHeader title={item.title} />
          {!text ? (
            <CardContent className="SortableCardContent">
              <Typography variant="inherit">{item.content}</Typography>
              {children}
            </CardContent>
          ) : null}
        </Card>
      </div>
    </StyledGrid>
  );
};

export interface SortableItemProps {
  item: Item;
  index: number;
  handler?: (id: string) => void;
  text?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  style?: React.CSSProperties;
  gridProps?: GridProps;
  children?: ReactElement;
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  "& .ButtonDiv": {
    position: "relative",
    paddingTop: 0,
  },
  "& .SortableButton": {
    display: "flex",
    position: "absolute",
    right: "-8px",
    top: "5px",
    zIndex: "1",
  },
  "& .SortableCard": {
    height: "300px",
  },
}));
