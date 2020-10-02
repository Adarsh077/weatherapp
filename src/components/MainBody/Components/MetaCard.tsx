import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MetaCardContainer = (props: Props) => (
  <div className="meta-card row">{props.children}</div>
);

const MetaCardLeft = (props: Props) => (
  <div className="col-6 meta-card-left">{props.children}</div>
);

const MetaCardRight = (props: Props) => (
  <div className="col-6 meta-card-right">{props.children}</div>
);

const MetaCardTitle = (props: Props) => (
  <div className="title">{props.children}</div>
);

const MetaCardText = (props: Props) => (
  <div className="text">{props.children}</div>
);

export {
  MetaCardContainer,
  MetaCardLeft,
  MetaCardRight,
  MetaCardText,
  MetaCardTitle,
};
