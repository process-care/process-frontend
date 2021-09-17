import React, { useEffect } from "react";

interface Props<T> {
  onChange: (value: T) => void;
  value: T;
}

export function FormikObserver<T>(props: Props<T>) {
  useEffect(() => {
    props.onChange(props.value);
  }, [Object.values(props.value).join(", ")]);
  return null;
}

FormikObserver.defaultProps = {
  onChange: () => null,
};
