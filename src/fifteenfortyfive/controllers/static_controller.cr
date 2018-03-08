module StaticController
  extend self

  def index(env)
    runner_submissions = Repo.all(RunnerSubmission).select{ |rs| rs.revoked == false }
    commentator_submissions = Repo.all(CommentatorSubmission).select{ |cs| cs.revoked == false }

    game_submissions = Repo.all(GameSubmission, preload: [:runner_submission, :game, :account])
    render_view "static/index"
  end
end
