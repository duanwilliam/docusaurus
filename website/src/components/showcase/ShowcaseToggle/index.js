/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState, useRef, memo} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.css';

const {orIcon, orIconStyle, andIcon, andIconStyle} = {
  orIcon: 'OR',
  orIconStyle: {},
  andIcon: '&',
  andIconStyle: {},
};

const Or = ({icon, style}) => (
  <span className={clsx(styles.toggle, styles.or)} style={style}>
    {icon}
  </span>
);

const And = ({icon, style}) => (
  <span className={clsx(styles.toggle, styles.and)} style={style}>
    {icon}
  </span>
); // Based on react-toggle (https://github.com/aaronshaf/react-toggle/).

const Toggle = memo(
  ({className, icons, checked: defaultChecked, disabled, onChange}) => {
    const [checked, setChecked] = useState(defaultChecked);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    const handleToggle = (e) => {
      const checkbox = inputRef.current;

      if (!checkbox) {
        return;
      }

      if (e.target !== checkbox) {
        e.preventDefault();
        checkbox.focus();
        checkbox.click();
        return;
      }

      setChecked(checkbox?.checked);
    };

    return (
      <div
        className={clsx(
          styles['react-toggle'],
          className,
          checked && styles['react-toggle--checked'],
          focused && styles['react-toggle--focus'],
          disabled && styles['react-toggle--disabled'],
        )}
        role="button"
        tabIndex={-1}
        onClick={handleToggle}>
        <div className={styles['react-toggle-track']}>
          <div className={styles['react-toggle-track-check']}>
            {icons.checked}
          </div>
          <div className={styles['react-toggle-track-x']}>
            {icons.unchecked}
          </div>
        </div>
        <div className={styles['react-toggle-thumb']} />

        <input
          ref={inputRef}
          checked={checked}
          type="checkbox"
          className={styles['react-toggle-screenreader-only']}
          aria-label="Switch between dark and light mode"
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    );
  },
);
export default function (props) {
  const {isClient} = useDocusaurusContext();
  return (
    <Toggle
      disabled={!isClient}
      icons={{
        checked: <Or icon={orIcon} style={orIconStyle} />,
        unchecked: <And icon={andIcon} style={andIconStyle} />,
      }}
      {...props}
    />
  );
}
