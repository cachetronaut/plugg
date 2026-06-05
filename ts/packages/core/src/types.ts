export type PrincipalId = string;

export type PrincipalKind = 'user' | 'agent' | 'service';

export interface Principal {
  readonly id: PrincipalId;
  readonly kind: PrincipalKind | string;
  readonly claims: Readonly<Record<string, unknown>>;
}

export interface AuthAdapter {
  resolve(credential: string): Promise<Principal>;
}
