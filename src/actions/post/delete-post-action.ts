'use server';
import { logColor } from '@/utils/log-color';

export async function deletePostAction(formData: FormData) {
  const id = formData.get('id') as string;

  // Aqui você pode adicionar a lógica para deletar o post do banco de dados
  // Exemplo:
  // await deletePostById(id);
  logColor(`Post com ID ${id} deletado`);
}
