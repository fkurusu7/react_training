import { SETTINGS_URI } from '../types/constants';
import type {
  SettingResponse,
  UpdateSettingRequest,
} from '../types/responses.type';

export async function getSettings(): Promise<SettingResponse> {
  try {
    const response = await fetch(SETTINGS_URI);

    if (!response.ok) {
      throw new Error('Settings could not be loaded');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    // Handle the case where error is not an Error instance
    throw new Error('An unknown error occurred while loading settings');
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(
  settingValue: UpdateSettingRequest
): Promise<SettingResponse> {
  try {
    const response = await fetch(SETTINGS_URI, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingValue),
    });

    if (!response.ok) {
      throw new Error(
        `Error updating setting ${settingValue.setting} with value ${settingValue.value}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(`Unknown error updating ${settingValue}`);
  }
}
