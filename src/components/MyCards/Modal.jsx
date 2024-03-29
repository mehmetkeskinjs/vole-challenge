import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import closeIcon from '/close-icon.svg';
import './Modal.css';

const Modal = ({ handleModalClose, cardDetail, handleSellModal }) => {
  const [card] = cardDetail;
  const { attributes } = card;

  const [cardBackgroundClass, setCardBackgroudClass] = useState('');

  useEffect(() => {
    if (card.cardType === 'Gold') {
      setCardBackgroudClass(
        'gold-bg-gradient flex w-full items-center justify-center'
      );
    } else if (card.cardType === 'Silver') {
      setCardBackgroudClass(
        'silver-bg-gradient flex w-full items-center justify-center'
      );
    } else if (card.cardType === 'Bronze') {
      setCardBackgroudClass(
        'bronze-bg-gradient flex w-full items-center justify-center'
      );
    }
  }, []);

  return createPortal(
    <div className="modal z-40">
      <div className="modal-content">
        <div className="relative flex max-h-[914px] w-[860px] flex-col items-center overflow-hidden overflow-y-auto rounded-base bg-sky-white shadow-sm">
          {/* banner */}
          <div className={cardBackgroundClass}>
            <img src={card.photoUrl} className="h-[382px]" alt="" />
          </div>
          {/* close icon */}
          <button
            className="close-btn absolute right-6 top-6 z-50"
            onClick={handleModalClose}
          >
            <img src={closeIcon} alt="" />
          </button>
          {/* top */}
          <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="uppercase text-red-base">{card.name}</h4>
                <p className="text-lg font-normal">{card.position}</p>
              </div>
              <div className="flex w-1/2 items-center justify-between rounded-base bg-sky-lighter p-6">
                <h4>€ {Number(card.price).toFixed(2)}</h4>
                <button
                  className="btn-primary"
                  onClick={() => handleSellModal(card.id)}
                >
                  Sell
                </button>
              </div>
            </div>
            {/* middle */}
            <div className="flex flex-col justify-between gap-4 rounded-base bg-sky-lighter p-6">
              <h5 className="text-lg font-bold uppercase leading-7">
                Attributes
              </h5>
              <ul className="flex justify-between gap-4">
                {Object.keys(attributes).map((attr, index) => (
                  <li
                    className="w-1/6 rounded-base bg-sky-white p-4"
                    key={index}
                  >
                    <p className="text-lg capitalize leading-7">{attr}</p>
                    <div className="flex items-baseline">
                      <h4>{attributes[attr]}</h4>
                      <p className="text-lg leading-7 text-sky-darker">/100</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* bottom */}
            <div className="flex items-center justify-between gap-6">
              <div className="w-1/2 rounded-base bg-sky-lighter p-6">
                <p className="text-lg font-normal leading-7">Team</p>
                <p className="text-xl font-bold leading-8">{card.team}</p>
              </div>
              <div className="w-1/2 rounded-base bg-sky-lighter p-6">
                <p className="text-lg font-normal leading-7">Card Type</p>
                <p className="text-xl font-bold leading-8">{card.cardType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
