import { UciSystemSystem, UciSystemTimeserver } from '@/shared/lib/uci/system';

export type UciSystemSection = UciSystemTimeserver | UciSystemSystem;

export interface SystemState {
	systemLoading: boolean;
	sections: UciSystemSection[];
}
