import {
  Budget,
  CostCenter,
  ListModel,
  B2BUnitNode,
  Permission,
  OrderApprovalPermissionType,
} from '../../model';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const ORGANIZATION_FEATURE = 'organization';

export const BUDGET_FEATURE = 'budget';
export const BUDGET_ENTITIES = 'budget-entities';
export const BUDGET_LIST = 'budget-list';

export const COST_CENTER_FEATURE = 'costCenter';
export const COST_CENTER_ENTITIES = 'costCenter-entities';
export const COST_CENTER_LIST = 'costCenter-list';
export const COST_CENTER_ASSIGNED_BUDGETS = 'costCenter-assigned-budgets';

export const PERMISSION_FEATURE = 'permission';
export const PERMISSION_ENTITIES = 'permission-entities';
export const PERMISSION_LIST = 'permission-list';

export const PERMISSION_TYPES_FEATURE = 'permission-types';
export const PERMISSION_TYPES_ENTITIES = 'permission-types-entities';
export const PERMISSION_TYPES_LIST = 'permission-types-list';

export const ORG_UNIT_FEATURE = 'orgUnit';
export const ORG_UNIT_ENTITIES = 'orgUnit-entities';
export const ORG_UNIT_LIST = 'orgUnit-list';

export interface Management<Type> {
  list: EntityLoaderState<ListModel>;
  entities: EntityLoaderState<Type>;
}

export interface BudgetManagement extends Management<Budget> {}

export interface OrgUnits extends Management<B2BUnitNode> {}

export interface PermissionTypesManagement
  extends Management<OrderApprovalPermissionType> {}

export interface PermissionManagement extends Management<Permission> {}

export interface CostCenterManagement extends Management<CostCenter> {
  budgets: EntityLoaderState<ListModel>;
}

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGET_FEATURE]: BudgetManagement;
  [ORG_UNIT_FEATURE]: OrgUnits;
  [PERMISSION_FEATURE]: PermissionManagement;
  [PERMISSION_TYPES_FEATURE]: PermissionTypesManagement;
  [COST_CENTER_FEATURE]: CostCenterManagement;
}
