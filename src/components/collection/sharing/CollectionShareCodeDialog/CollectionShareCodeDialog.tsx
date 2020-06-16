import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../common/share/ShareCodeDialog/ShareCodeDialog.less';
import { fetchCollectionAction } from '../../redux/actions/fetchCollectionAction';
import State from '../../../../types/State';
import { useRefererIdInjector } from '../../../../hooks/useRefererIdInjector';
import { ShareCodeDialog } from '../../../common/share/ShareCodeDialog/ShareCodeDialog';
import {storeReferrerShareCodeAction} from "src/app/redux/authentication/actions/storeReferrerShareCodeAction";
interface Props {
  collectionId: string;
}

export const CollectionShareCodeDialog = React.memo((props: Props) => {
  const referer = useRefererIdInjector();
  const [visible, setVisible] = useState(true);
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const collectionHasLoaded = useSelector(
    (state: State) => !!state.entities.collections.byId[props.collectionId],
  );
  const collectionsLoading = useSelector(
    (state: State) => state.collections.loading,
  );

  const referrerShareCode = useSelector(
    (state: State) => state.authentication.refererShareCode,
  );

  useEffect(() => {
    if (collectionHasLoaded) {
      setVisible(false);
    // } else if (referrerShareCode) {
    //   console.log(`handling submit with share code ${referrerShareCode}`)
    //   handleSubmit(referrerShareCode)
    } else {
      setVisible(true);
      if (submitted && !collectionsLoading) {
        setCodeInvalid(true);
      }
    }
  }, [collectionHasLoaded, collectionsLoading, setVisible, submitted]);

  const handleSubmit = (shareCode) => {
    console.log(`submitting`);
    dispatch(
      fetchCollectionAction({
        id: props.collectionId,
        referer,
        shareCode,
      }),
    );
    // if (!referrerShareCode) {
    //   dispatch(storeReferrerShareCodeAction(shareCode));
    // }
    setSubmitted(true);
  };

  return (
    <ShareCodeDialog
      visible={visible}
      codeInvalid={codeInvalid}
      onSubmit={handleSubmit}
      title="Enter code to view collection"
      cta="View collection"
    />
  );
});
