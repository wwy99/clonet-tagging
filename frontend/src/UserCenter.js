import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function UserCenter({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStartTagging = () => {
    navigate('/image-tagging');
  };

  // Extract the required properties from the user object, or provide default values
  const { wechatName = '', phoneNumber = '', taggedImages = 0, payout = 0 } = user || {};

  return (
    <div className="user-center">
      <div className="user-info">
        <h2>{t('center.title')}</h2>
        <div>
          <strong>{t('center.wechatName')}:</strong> {wechatName}
        </div>
        <div>
          <strong>{t('center.phoneNumber')}:</strong> {phoneNumber}
        </div>
        <div>
          <strong>{t('center.taggedImages')}:</strong> {taggedImages}
        </div>
        <div>
          <strong>{t('center.payout')}:</strong> {payout}
        </div>
      </div>
      <div className="user-actions">
        <button type="button" onClick={handleStartTagging}>
          {t('center.startTagging')}
        </button>
      </div>
    </div>
  );
}

export default UserCenter;
