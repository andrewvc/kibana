/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useContext, useState } from 'react';

import { EuiButtonEmpty, EuiContextMenu, EuiIcon, EuiPopover } from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import { CLIENT_ALERT_TYPES } from '../../../../common/constants';
import {
  canDeleteMLJobSelector,
  hasMLJobSelector,
  isMLJobCreatingSelector,
} from '../../../state/selectors';
import { UptimeSettingsContext } from '../../../contexts';
import * as labels from './translations';
import { getMLJobLinkHref } from './ml_job_link';
import { useGetUrlParams } from '../../../hooks';
import { useMonitorId } from '../../../hooks';
import { setAlertFlyoutType, setAlertFlyoutVisible } from '../../../state/actions';

interface Props {
  hasMLJob: boolean;
  onEnableJob: () => void;
  onJobDelete: () => void;
}

export const ManageMLJobComponent = ({ hasMLJob, onEnableJob, onJobDelete }: Props) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const { basePath } = useContext(UptimeSettingsContext);

  const canDeleteMLJob = useSelector(canDeleteMLJobSelector);

  const isMLJobCreating = useSelector(isMLJobCreatingSelector);

  const { loading: isMLJobLoading } = useSelector(hasMLJobSelector);

  const { dateRangeStart, dateRangeEnd } = useGetUrlParams();

  const monitorId = useMonitorId();

  const dispatch = useDispatch();

  const button = (
    <EuiButtonEmpty
      data-test-subj={hasMLJob ? 'uptimeManageMLJobBtn' : 'uptimeEnableAnomalyBtn'}
      iconType={hasMLJob ? 'arrowDown' : 'machineLearningApp'}
      iconSide={hasMLJob ? 'right' : 'left'}
      onClick={hasMLJob ? () => setIsPopOverOpen(true) : onEnableJob}
      disabled={hasMLJob && !canDeleteMLJob}
      isLoading={isMLJobCreating || isMLJobLoading}
    >
      {hasMLJob ? labels.ANOMALY_DETECTION : labels.ENABLE_ANOMALY_DETECTION}
    </EuiButtonEmpty>
  );

  const panels = [
    {
      id: 0,
      title: labels.MANAGE_ANOMALY_DETECTION,
      items: [
        {
          name: labels.EXPLORE_IN_ML_APP,
          icon: <EuiIcon type="dataVisualizer" size="m" />,
          href: getMLJobLinkHref({
            basePath,
            monitorId,
            dateRange: { from: dateRangeStart, to: dateRangeEnd },
          }),
          target: '_blank',
        },
        {
          name: labels.ENABLE_ANOMALY_ALERT,
          'data-test-subj': 'uptimeEnableAnomalyAlertBtn',
          icon: <EuiIcon type="bell" size="m" />,
          onClick: () => {
            dispatch(setAlertFlyoutType(CLIENT_ALERT_TYPES.DURATION_ANOMALY));
            dispatch(setAlertFlyoutVisible(true));
          },
        },
        {
          name: labels.DISABLE_ANOMALY_DETECTION,
          'data-test-subj': 'uptimeDeleteMLJobBtn',
          icon: <EuiIcon type="trash" size="m" />,
          onClick: () => {
            setIsPopOverOpen(false);
            onJobDelete();
          },
        },
      ],
    },
  ];

  return (
    <EuiPopover button={button} isOpen={isPopOverOpen} closePopover={() => setIsPopOverOpen(false)}>
      <EuiContextMenu
        initialPanelId={0}
        panels={panels}
        data-test-subj="uptimeManageMLContextMenu"
      />
    </EuiPopover>
  );
};
