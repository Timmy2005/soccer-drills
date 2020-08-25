# shellcheck disable=SC2164
cd ~/soccerdrills
source virtualenvwrapper.sh
workon soccerdrills

dropdb soccerdrills
createdb --owner=timothy soccerdrills

python web/manage_dev.py makemigrations
python web/manage_dev.py migrate
python web/manage_dev.py initdb
