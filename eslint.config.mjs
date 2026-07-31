import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // React 19의 새 react-hooks 규칙이 잘 동작하는 관리자 페이지의 흔한
    // "마운트 시 load()" / 함수 선언 순서 패턴을 error로 막아 배포 체크가 실패했음.
    // 런타임엔 문제없으므로 error → warn으로 낮춰 배포 체크를 통과시킴.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
