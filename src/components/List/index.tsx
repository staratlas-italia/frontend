import { Spacing } from "~/common/spacing";
import { Flex } from "~/components/layout/Flex";
import { Item, ItemProps } from "~/components/List/components/Item";
import { Section } from "~/components/List/components/Section";

export type ListSectons = [string, ItemProps[]][];

type Props = {
  spacing?: Spacing;
  sections: ListSectons;
};

export const List = ({ sections, spacing = 3 }: Props) => {
  return (
    <Flex direction="col" className={`space-y-${spacing}`}>
      {sections.map(([title, items]) => (
        <Section title={title} key={title}>
          {items.map((item, index) => (
            <Item key={index.toString()} {...item} />
          ))}
        </Section>
      ))}
    </Flex>
  );
};
