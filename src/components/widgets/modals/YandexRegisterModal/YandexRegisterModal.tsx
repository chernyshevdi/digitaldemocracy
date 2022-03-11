import React, { useEffect } from 'react';
import { Box, Button, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ModalWrapper } from '../ModalWrapper';
import { useFetchUserData } from './hooks/useFetchUserData';
import { WrapperAsyncRequest } from '../../../Loading/WrapperAsyncRequest';

const YandexRegisterModal: React.FC<{ open: boolean; onClose: () => void }> = ({ onClose, open }) => {
  const { status, getData } = useFetchUserData();
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <WrapperAsyncRequest status={status}>
          <CloseIcon
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
              color: '#B0B0B0',
              width: 40,
              height: 40,
              fontWeight: '300',
            }}
          />
          <ModalWrapper>
            <Typography color="textPrimary" gutterBottom variant="h3" mb="2" fontWeight="300" align="center">
              Вы успешно зарегистрировались!
            </Typography>
            <>
              <Typography align="justify">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Дорогой Друг! Демократия - это "власть народа", народ является источником власти. Но это ещё и
                ответственность реализовывать это право, делать свой выбор, голосовать за тех, кого народ этой властью
                наделяет. Ответственность проявлять свою позицию, чтобы изменить жизнь для нас и наших детей в нашей
                стране лучше. Цифровая эпоха даёт нам новые возможности. Наша платформа позволяет пользователям
                формировать рейтинг политиков через оценку их действий, что бы на основании него потом сделать
                осознанный выбор. Важная составляющая рейтинга, доверие к нему. Поэтому мы всеми возможными путями будем
                бороться с попытками нечестно повлиять на рейтинг. Это, к сожалению, может затронуть и добропорядочных
                пользователей. Мы принимаем всех, но если аккаунт будет заподозрен в недобросовестной активности, то мы
                попросим пройти верификацию. В случае непрохождения проверки все оценки и действия аккаунта будут
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                удалены. Просим отнестись к этому с пониманием. Добро пожаловать в "цифровую демократию"!
              </Typography>
              <Button
                sx={{
                  mt: 2,
                }}
                color="primary"
                size="large"
                variant="contained"
                onClick={onClose}
              >
                Завершить
              </Button>
            </>
          </ModalWrapper>
        </WrapperAsyncRequest>
      </Box>
    </Modal>
  );
};

export default YandexRegisterModal;
