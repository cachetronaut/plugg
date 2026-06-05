import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { AuthAdapter, Principal } from '../src/index';
import { AuthError, canonicalizePrincipal, isAuthError, principalToJson } from '../src/index';

const fixturePath = join(
  import.meta.dirname,
  'conformance',
  'principal',
  'basic',
  'principal.json',
);
const sharedFixturePath = join(
  import.meta.dirname,
  '..',
  '..',
  '..',
  'docs',
  'fixtures',
  'fabric-conformance',
  'principal',
  'basic',
  'principal.json',
);

describe('Principal conformance', () => {
  it('round-trips the principal fixture byte-identically', () => {
    const principal = JSON.parse(readFileSync(fixturePath, 'utf8')) as Principal;
    const fixture = JSON.parse(readFileSync(fixturePath, 'utf8')) as Record<string, unknown>;

    expect(principalToJson(principal)).toEqual(fixture);
    expect(canonicalizePrincipal(principal)).toBe(
      '{"claims":{"org":"org_demo","roles":["developer","operator"]},"id":"principal_user_01","kind":"user"}',
    );
  });

  it('vendors the shared principal conformance fixture unchanged', () => {
    expect(readFileSync(fixturePath, 'utf8')).toBe(readFileSync(sharedFixturePath, 'utf8'));
  });

  it('preserves custom principal kinds without privilege logic', () => {
    const principal: Principal = {
      id: 'principal_device_01',
      kind: 'device',
      claims: {},
    };

    expect(principalToJson(principal)).toEqual({
      id: 'principal_device_01',
      kind: 'device',
      claims: {},
    });
  });
});

describe('AuthAdapter port', () => {
  it('resolves an opaque credential through the port', async () => {
    const expected: Principal = { id: 'principal_agent_01', kind: 'agent', claims: {} };
    const adapter: AuthAdapter = {
      resolve: async (credential: string): Promise<Principal> => {
        if (credential !== 'opaque-dev-credential') {
          throw new AuthError('invalid_credential', 'Unknown credential');
        }
        return expected;
      },
    };

    await expect(adapter.resolve('opaque-dev-credential')).resolves.toEqual(expected);
    await expect(adapter.resolve('wrong')).rejects.toMatchObject({
      code: 'invalid_credential',
    });
  });

  it('narrows typed auth errors', () => {
    const error = new AuthError('expired_credential', 'Credential expired');

    expect(isAuthError(error)).toBe(true);
    expect(isAuthError(new Error('other'))).toBe(false);
  });
});
