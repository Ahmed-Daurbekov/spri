import React from 'react';
import file from '../../img/icons/file.svg'
import './Documents.scss'

const Documents = () => {
  return (
    <div className='documents'>
      <div className="container">
        <h2 className='documents_title'>Регламентирующие документы</h2>
        <div className="regulatory-document_blocks">
          <a target='_blank' href="https://rossp.ru/docs/ustav/">
            <span className="regulatory-document_block">
              <span className="document_block-img">
                <img src={file} alt="file" />
              </span>
              <p className="document_block-text">
                Устав Российского союза писателей
              </p>
            </span>
          </a>

          <a target='_blank' href="https://rossp.ru/docs/expert/">
            <span className="regulatory-document_block">
              <span className="document_block-img">
                <img src={file} alt="file" />
              </span>
              <p className="document_block-text">
                Положение об Экспертном совете
              </p>
            </span>
          </a>
{/* 
          <a target='_blank' href="https://rossp.ru/docs/regions/">
            <span className="regulatory-document_block">
              <span className="document_block-img">
                <img src={file} alt="file" />
              </span>
              <p className="document_block-text">
                Устав Российского союза писателей
              </p>
            </span>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Documents;