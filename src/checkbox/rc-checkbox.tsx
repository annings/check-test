import React, { useState, useEffect, useRef } from "react";
import Checkbox from "rc-checkbox";
import classNames from "classnames";

// import "rc-checkbox/assets/index.css";

const Index = (props) => {
  const inputEl = useRef(null);
  console.log("props", props);

  const [checked, setCheck] = useState(
    "checked" in props ? props.checked : props.defaultChecked
  );
  useEffect(() => {});
  const {
    prefixCls,
    className,
    style,
    name,
    id,
    type,
    disabled,
    readOnly,
    tabIndex,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    autoFocus,
    value,
    required,
    ...others
  } = props;

  const handleChange = (e) => {
    console.log(e);
    const { disabled, onChange } = props;
    if (disabled) {
      return;
    }
    if (!("checked" in props)) {
      setCheck(e.target.checked);
    }
    if (onChange) {
      onChange({
        target: { ...props, checked: e.target.checked },
        stopPropagation() {
          e.stopPropagtion();
        },
        proventDefault() {
          e.preventDefault();
        },
        nativeEvent: e.nativeevent,
      });
    }
  };
  const saveInput = (node) => {
    inputEl.current = node;
  };
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled,
  });
  return (
    // {/* <Checkbox /> */}
    <span className={classString} style={style}>
      <input
        name={name}
        id={id}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        tabIndex={tabIndex}
        className={`${prefixCls}-input`}
        checked={!!checked}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onChange={handleChange}
        autoFocus={autoFocus}
        ref={saveInput}
        value={value}
        type="checkbox"
      />
      <span className={`${prefixCls}-inner`} />
    </span>
  );
};

Index.displayName = "checkbox";

Index.defaultProps = {
  prefixCls: "an-checkbox",
  className: "",
  style: {},
  type: "checkbox",
  defaultChecked: false,
  onFocus() {},
  onBlur() {},
  onChange() {},
  onKeyDown() {},
  onKeyPress() {},
  onKeyUp() {},
};

export default Index;
