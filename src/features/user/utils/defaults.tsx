export type EmailConfirmBlockError = {
  status: boolean;
  message: string;
} | null;

export const emailConfirmDefaultBlockError: EmailConfirmBlockError = {
  status: false,
  message: 'Unknown error occurred',
};
