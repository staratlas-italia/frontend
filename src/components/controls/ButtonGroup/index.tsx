import classNames from "classnames";
import { Flex } from "~/components/layout/Flex";

type Props = {
  items: [string, string][];
  onAction: (key: string) => void;
  selectedItem?: string;
};

export const ButtonGroup = ({ items, onAction, selectedItem }: Props) => {
  return (
    <Flex className="rounded-md shadow-sm" role="group">
      {items.map(([key, value], index) => (
        <button
          key={key}
          type="button"
          onClick={() => onAction(key)}
          className={classNames(
            "py-2 px-4 text-sm font-medium text-gray-900 bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white",
            { "bg-gray-200": selectedItem === key },
            { "rounded-l-lg": index === 0 },
            { "rounded-r-lg": index === items.length - 1 }
          )}
        >
          {value}
        </button>
      ))}
    </Flex>
  );
};
