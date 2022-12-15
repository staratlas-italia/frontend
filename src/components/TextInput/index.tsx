import { ExclamationCircleIcon } from "@heroicons/react/solid";
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { BaseTextInput, BaseTextInputProps } from "~/components/BaseTextInput";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

type Props = BaseTextInputProps & {
  label: string;
  rules?: RegisterOptions;
};

export const TextInput = ({
  label,
  name,
  rules,
  defaultValue,
  ...props
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <Flex direction="col" shrink={1}>
      <Flex pb={1} pl={2}>
        <Text color="text-gray-500" weight="bold">
          {label}
        </Text>
      </Flex>

      <Flex direction="col" className="bg-gray-100 rounded-xl" px={3} py={4}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onBlur, onChange, value } }) => (
            <BaseTextInput
              {...props}
              colorName="black"
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              placeholderTextColor="gray.300"
              value={value}
            />
          )}
          rules={rules}
        />
      </Flex>

      {error && (
        <Flex pl={2} pt={1} shrink={1}>
          <Text color="text-red-400" weight="semibold">
            <Flex align="center" direction="row" shrink={1}>
              <ExclamationCircleIcon className="w-5 h-5" />

              <Flex pl={2} shrink={1}>
                {error.message}
              </Flex>
            </Flex>
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
