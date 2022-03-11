import React from 'react';

export default function YandexHiddenFrame({ redirectTo }) {
  return (
    <iframe hidden title="yandex-hidden-frame" src={redirectTo} />
  );
}
