Rails.application.config.before_initialize do

  module Marbles
    class Application < Rails::Application

      config.before_initialize do
        env_file = File.join(Rails.root, 'config', 'local_env.yml')
        YAML.load(File.open(env_file)).each do |key, value|
          ENV[key.to_s] = value
        end if File.exists?(env_file)
      end
    end
  end

end