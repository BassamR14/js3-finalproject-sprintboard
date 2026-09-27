const CLASSIC_PAT = /^ghp_[A-Za-z0-9]{36}$/;
const FINE_GRAINED_PAT = /^github_pat_[A-Za-z0-9_]{22,}$/;

export function isValidPatFormat(pat: string): boolean {
  return CLASSIC_PAT.test(pat) || FINE_GRAINED_PAT.test(pat);
}
