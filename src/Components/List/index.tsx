import React from "react";
import { sortBy } from "lodash";
import { Story, Stories } from "./types";
import { ReactComponent as Check } from "./check.svg";

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};

interface SortingFunction {
  [key: string]: (list: Stories) => Stories;
}

const SORTS = {
  NONE: (list: Stories) => list,
  TITLE: (list: Stories) => sortBy(list, "title"),
  AUTHOR: (list: Stories) => sortBy(list, "author"),
  COMMENT: (list: Stories) => sortBy(list, "num_comments").reverse(),
  POINT: (list: Stories) => sortBy(list, "points").reverse()
} as SortingFunction;

// const SORTS: { [key: string]: (list: Stories) => Stories } = {
//   NONE: (list: Stories) => list,
//   TITLE: (list: Stories) => sortBy(list, "title"),
//   AUTHOR: (list: Stories) => sortBy(list, "author"),
//   COMMENT: (list: Stories) => sortBy(list, "num_comments").reverse(),
//   POINT: (list: Stories) => sortBy(list, "points").reverse()
// };

const List = React.memo(({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState({
    sortKey: "NONE",
    isReverse: false
  });
  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div>
        <span>
          <button
            type="button"
            onClick={() => handleSort("TITLE")}
            className="button-header"
            style={{ width: "40%" }}
          >
            Title
          </button>
        </span>
        <span>
          <button
            type="button"
            onClick={() => handleSort("AUTHOR")}
            className="button-header"
            style={{ width: "30%" }}
          >
            Author
          </button>
        </span>
        <span>
          <button
            type="button"
            onClick={() => handleSort("COMMENT")}
            className="button-header"
            style={{ width: "10%" }}
          >
            Comments
          </button>
        </span>
        <span>
          <button
            type="button"
            onClick={() => handleSort("POINT")}
            className="button-header"
            style={{ width: "10%" }}
          >
            Points
          </button>
        </span>
        <span>
          <label className="button-header" style={{ width: "10%" }}>
            Actions
          </label>
        </span>
      </div>

      {sortedList.map((item: Story) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </div>
  );
});

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => (
  <div className="item">
    <span style={{ width: "40%" }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: "30%" }}>{item.author}</span>
    <span style={{ width: "10%" }}>{item.num_comments}</span>
    <span style={{ width: "10%" }}>{item.points}</span>
    <span style={{ width: "10%" }}>
      <button
        type="button"
        onClick={() => onRemoveItem(item)}
        className="button button_small"
      >
        <Check height="18px" width="18px" />
      </button>
    </span>
  </div>
);

export { Item };
export default List;
