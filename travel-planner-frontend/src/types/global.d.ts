// Add Node.js path module declaration
declare module "path" {
  export function resolve(...paths: string[]): string;
  export function join(...paths: string[]): string;
  export function dirname(path: string): string;
  // Add other path methods as needed
}

// Add __dirname global
declare const __dirname: string;
