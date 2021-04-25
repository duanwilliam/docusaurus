/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {memo} from 'react';

import styles from './styles.module.css';
import clsx from 'clsx';
import Image from '@theme/IdealImage';
import {Tags, TagList} from '../../../data/users';
import {sortBy} from '../../../utils/jsUtils';

function TagIcon({label, description, icon}) {
  return (
    <span
      className={styles.tagIcon}
      // TODO add a proper tooltip
      title={`${label}: ${description}`}
      aria-label={`${label}: ${description}`}>
      {icon}
    </span>
  );
}

function ShowcaseCardTagIcons({tags}) {
  const tagObjects = tags
    .map((tag) => ({tag, ...Tags[tag]}))
    .filter((tagObject) => !!tagObject.icon);

  // Keep same order of icons for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return tagObjectsSorted.map((tagObject, index) => (
    <TagIcon key={index} {...tagObject} />
  ));
}

function ConditionalLink({
  condition,
  href,
  defaultTag = `div`,
  linkProps = {},
  defaultProps = {},
  className,
  children,
  ...sharedProps
}) {
  const [Tag, {className: tagClassName, ...tagProps}] = condition
    ? [`a`, {...linkProps, href: href}]
    : [`${defaultTag}`, defaultProps];
  const props = {
    ...sharedProps,
    ...tagProps,
  };
  return (
    <Tag className={clsx(className, tagClassName && tagClassName)} {...props}>
      {children}
    </Tag>
  );
}

const ShowcaseCard = memo(function ({
  user: {title, description, website, preview, source, tags},
}) {
  const footerLinks = [{href: source, label: 'Source'}];
  return (
    <div key={title} className="col col--4 margin-bottom--lg">
      <div className={clsx('card', styles.showcaseCard)}>
        <ConditionalLink
          className={clsx('card__image', styles.showcaseCardImage)}
          condition={website}
          href={website}
          linkProps={{
            target: '_blank',
            rel: 'noreferrer noopener',
          }}>
          <Image img={preview} alt={title} />
        </ConditionalLink>
        <div className="card__body">
          <div className="avatar">
            <div className="avatar__intro margin-left--none">
              <div className={styles.titleIconsRow}>
                <ConditionalLink
                  className={styles.titleIconsRowTitle}
                  condition={website}
                  href={website}
                  linkProps={{
                    className: styles.titleLink,
                    target: '_blank',
                    rel: 'noreferrer noopener',
                  }}>
                  <h4 className="avatar__name">{title}</h4>
                </ConditionalLink>
                <div className={styles.titleIconsRowIcons}>
                  <ShowcaseCardTagIcons tags={tags} />
                </div>
              </div>
              <small className="avatar__subtitle">{description}</small>
            </div>
          </div>
        </div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {footerLinks.map(({href, label}) => (
              <a
                className={clsx(
                  'button button--small button--secondary button--block',
                  {disabled: !href},
                )}
                href={href}
                target="_blank"
                rel="noreferrer noopener">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShowcaseCard;
