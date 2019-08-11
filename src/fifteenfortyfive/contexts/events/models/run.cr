module Events
  class Run < Crecto::Model
    schema "ev_runs" do
      belongs_to :submission, RunSubmission
      belongs_to :event, Event
      has_many :run_events, RunEvent

      belongs_to :team, Team
      belongs_to :account, Accounts::Account
      belongs_to :game, Inventory::Game
      belongs_to :category, Inventory::Category

      field :pb_seconds, Int32
      field :est_seconds, Int32
      field :actual_seconds, Int32

      field :started_at, Time
      field :finished_at, Time

      field :finished, Bool, default: false

      field :index, Int32
      field :accepted, Bool, default: false
    end
  end
end
