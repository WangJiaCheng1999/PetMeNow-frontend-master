import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user)
    await AsyncStorage.setItem('@userinfo', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const saveList = async (list) => {
  try {
    const jsonValue = JSON.stringify(list)
    await AsyncStorage.setItem('@list', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getList = async () => {
  try {
    const value = await AsyncStorage.getItem('@list')
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    // error reading value
  }
}

export const clear = async () => {
  try {
    await AsyncStorage.removeItem('@userinfo')
  } catch (e) {
    // saving error
  }
}

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('@userinfo')
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
}
