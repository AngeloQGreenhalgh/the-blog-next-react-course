'use server';
import { asyncDelay } from '@/utils/async-delay';
import { logColor } from '@/utils/log-color';

export async function deletePostAction(id: string) {
  await asyncDelay(2000); // Simula um atraso de 2 segundos para a operação de deleção
  // Aqui você pode adicionar a lógica para deletar o post do banco de dados
  // Exemplo:
  // await deletePostById(id);
  logColor(`Post com ID ${id} deletado`);

  return id;
}
