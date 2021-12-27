import { FormattedMessage } from "react-intl";
import { GetTranslationValues, TranslationId } from "~/i18n/translations/types";

type Props<Id> = {
  id: Id;
  defaultMessage?: string;
} & GetTranslationValues<Id>;

export const Translation = <Id extends TranslationId>({
  id,
  defaultMessage,
  values,
}: Props<Id>) => {
  return (
    <FormattedMessage id={id} values={values} defaultMessage={defaultMessage} />
  );
};
