import { KeyboardEvent, MutableRefObject } from "react";
import { AutoComplete } from "../tokens/autoComplete";

export type ForwardedRef<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null;

type TextAlign = "left" | "right";

type AutoCapitalize = "characters" | "none" | "sentences" | "words";

type ReturnKeyType = "done" | "go" | "next" | "search" | "send";

export type InputType =
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url";

export type BaseTextInputProps = {
  autoCapitalize?: AutoCapitalize;
  autoComplete?: AutoComplete;
  autoFocus?: boolean;
  className?: string;
  colorName?: string;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitEditing?: (value: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  returnKeyType?: ReturnKeyType;
  textAlign?: TextAlign;
  type?: InputType;
  value?: string;
};
