import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { database } from './../lib/firebase';

// Функция для проверки существования пользователя в Firestore
async function checkUserExists(userId: number): Promise<boolean> {
  const userDocRef = doc(database, 'users', userId.toString());
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists();
}

// Функция для создания пользователя в Firestore
async function createUserInFirestore(userData: any): Promise<void> {
  const { id, first_name, last_name } = userData;
  const userDocRef = doc(database, 'users', id.toString());
  await setDoc(userDocRef, {
    first_name,
    last_name,
  });

  await createPersonalTrackingRecord(id);
}

// Функция для создания записи в таблице Personal_Tracking
async function createPersonalTrackingRecord(userId: number): Promise<void> {
  const userDocRef = doc(database, 'users', userId.toString());
  // Добавляем запись в коллекцию Personal_Tracking
  await addDoc(collection(database, 'personal_tracking'), {
    user_id: userDocRef,
    date: 1709241840,
    amount: 0,
  });
}

// Обработчик запроса для вашего приложения
export async function handleUserRequest(userInfo: any): Promise<void> {
  if (!userInfo || !userInfo.id) {
    console.log('Пользователь не получен!');
    return;
  }

  const { id } = userInfo;
  // Проверяем, существует ли пользователь в Firestore
  const userExists = await checkUserExists(id);

  if (!userExists) {
    // Создаем пользователя в Firestore
    await createUserInFirestore(userInfo);
    console.log('Пользователь создан в Firestore.');
  } else {
    // Получаем информацию о пользователе из Firestore
    const userDocRef = doc(database, 'users', id.toString());
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();

    console.log('Информация о пользователе из Firestore:', userData, id);
  }
}
