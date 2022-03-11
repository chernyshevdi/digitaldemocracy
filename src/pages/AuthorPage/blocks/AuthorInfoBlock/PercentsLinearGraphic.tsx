import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { GraphicDataI } from 'src/slices/massMediaSlice';
import styles from './PercentsLinearGraphic.module.scss';

const mock = [
  {
    id: 1,
    width: 0,
    color: '#BE3B21',
    zIndex: 5,
  },
  {
    id: 2,
    width: 0,
    color: '#EB4335',
    zIndex: 4,
  },
  {
    id: 3,
    width: 100,
    color: '#747373',
    zIndex: 3,
  },
  {
    id: 4,
    width: 0,
    color: '#34A853',
    zIndex: 2,
  },
  {
    id: 5,
    width: 0,
    color: '#248232',
    zIndex: 1,
  },
];

interface IProps {
  vote_groups?: Array<GraphicDataI>;
}

export const PercentsLinearGraphic: FC<IProps> = ({ vote_groups }) => {
  const exist = vote_groups || mock;
  const nonEmpty = exist?.filter((it) => it.width !== 0);
  const hiddenValue = 15;
  const widthWithoutCut = nonEmpty?.reduce((acc, rec) => (rec.width > hiddenValue ? acc + rec.width : acc), 0);
  const count = exist?.reduce((acc, rec) => {
    return rec.width <= hiddenValue && rec.width !== 0 ? acc + 1 : acc;
  }, 0);
  const totalWidth = 100 - count * hiddenValue;
  const finalArray = exist?.map((it) =>
    it.width > hiddenValue || it.width === 0
      ? { ...it, width: (it.width / widthWithoutCut) * totalWidth }
      : { ...it, width: hiddenValue }
  );
  return (
    <>
      {!!exist && (
        <div className={styles.container}>
          {exist.map(({ color, id, width, zIndex }, index) => {
            const previosWidth = finalArray
              .filter((it, secondIndex) => secondIndex < index)
              .reduce((acc, rec) => acc + rec.width, 0);
            return (
              <>
                <div
                  key={id.toString()}
                  style={{
                    width: `${previosWidth + finalArray[index].width}%`,
                    backgroundColor: color,
                    zIndex,
                  }}
                  className={styles.line}
                >
                  <span>{`${Math.round(width)} %`}</span>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
