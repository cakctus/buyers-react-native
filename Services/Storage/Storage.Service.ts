import AsyncStorage from "@react-native-async-storage/async-storage"

class StorageService {
  static async get(key: string): Promise<any | null> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value !== null ? JSON.parse(value) : null
    } catch (error) {
      console.error("Error while getting data from storage:", error)
      return null
    }
  }

  static async set(key: string, data: any): Promise<boolean> {
    try {
      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem(key, jsonData)
      return true
    } catch (error) {
      console.error("Error while setting data in storage:", error)
      return false
    }
  }

  static async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("Error while removing data from storage:", error)
      return false
    }
  }
}

export default StorageService
