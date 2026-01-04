import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    console.log('\n', 'findAllPublic', '\n');
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    console.log('\n', 'findBySlugPublic', '\n');
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) {
      throw new Error('Post não encontrado para slug');
    }
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    console.log('\n', 'findAll', '\n');
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    console.log('\n', 'findById', '\n');
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) {
      throw new Error('Post não encontrado para ID');
    }
    return post;
  }
  async create(postData: PostModel): Promise<PostModel> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, postData: PostModel): Promise<PostModel | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

(async () => {
  const repo = new DrizzlePostRepository();
  // const posts = await repo.findAllPublic();
  // posts.forEach(post => {
  //   console.log(post.slug, post.published);
  // });

  // const post = await repo.findBySlugPublic(
  //   'rotina-matinal-de-pessoas-altamente-eficazes',
  // );
  // console.log(post);

  // const post = await repo.findBySlugPublic('teste');
  // console.log(post);

  // const posts = await repo.findAll();
  // posts.forEach(post => {
  //   console.log(post.id, post.slug, post.published);
  // });

  // 6b204dab-2312-4525-820a-a0463560835f como-a-tecnologia-impacta-nosso-bem-estar false
  // 76396dd3-9581-43b5-856d-fe1a78714e8c os-desafios-do-trabalho-remoto-moderno true

  // const post = await repo.findById('6b204dab-2312-4525-820a-a0463560835f');
  // console.log(post);

  // const post = await repo.findById('76396dd3-9581-43b5-856d-fe1a78714e8c');
  // console.log(post);
  // const post = await repo.findById('76396dd3-9581-43b5-856d-fe1a78714e8m');
  // console.log(post);
})();
