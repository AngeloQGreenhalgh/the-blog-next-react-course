import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { writeFile, readFile, access } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { PostModel } from '@/models/post/post-model';

// Definindo o caminho raiz da aplicação
const ROOT_DIR = process.cwd();

// Caminho para o arquivo posts.json
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  // Função para ler os posts do arquivo JSON
  private async readFromDisk() {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  // Função para escrever os posts no arquivo JSON
  private async writeToDisk(posts: PostModel[]) {
    await writeFile(
      JSON_POSTS_FILE_PATH,
      JSON.stringify({ posts }, null, 2),
      'utf-8',
    );
  }

  private async init() {
    try {
      await access(JSON_POSTS_FILE_PATH, fsConstants.F_OK);
      // Arquivo existe, não faz nada
    } catch {
      // Arquivo não existe, cria um novo arquivo em branco (com array de posts)
      await this.writeToDisk([]);
    }
  }

  async findAll(): Promise<PostModel[]> {
    await this.init();
    const posts = await this.readFromDisk();
    return posts as PostModel[];
  }

  async findById(id: string): Promise<PostModel> {
    await this.init();
    const posts = await this.findAll();
    const post = posts.find((post: PostModel) => post.id === id);

    if (!post) {
      throw new Error('Post não encontrado');
    }

    return post as PostModel;
  }

  async create(postData: PostModel): Promise<PostModel> {
    await this.init();
    const posts = await this.findAll();
    postData.id = uuidv4(); // Gera um novo ID único para o post
    posts.push(postData);

    // Atualiza o arquivo JSON com o novo array de posts
    await this.writeToDisk(posts);

    return postData;
  }

  async update(id: string, postData: PostModel): Promise<PostModel | null> {
    await this.init();
    const posts = await this.findAll();
    const postIndex = posts.findIndex((post: PostModel) => post.id === id);

    if (postIndex === -1) {
      return null; // Post não encontrado
    }

    // Atualiza os dados do post existente
    posts[postIndex] = { ...posts[postIndex], ...postData };

    // Atualiza o arquivo JSON com o array de posts modificado
    await this.writeToDisk(posts);

    return posts[postIndex];
  }

  async delete(id: string): Promise<boolean> {
    await this.init();
    const posts = await this.findAll();
    const postIndex = posts.findIndex((post: PostModel) => post.id === id);

    if (postIndex === -1) {
      return false; // Post não encontrado
    }

    // Remove o post do array
    posts.splice(postIndex, 1);

    // Atualiza o arquivo JSON com o array de posts modificado
    await this.writeToDisk(posts);

    return true; // Post removido com sucesso
  }
}
