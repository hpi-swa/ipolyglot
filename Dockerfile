FROM oracle/graalvm-ce:19.0.2

RUN gu install python ruby R
RUN /opt/graalvm-ce-19.0.2/jre/languages/ruby/lib/truffle/post_install_hook.sh
RUN yum install -y python36 python36-devel python36-pip git
RUN easy_install-3.6 pip
RUN pip3 install -U pip
RUN pip3 install jupyter_core==4.4 jupyter

WORKDIR /code
COPY . .
RUN git clean -ffxd
RUN npm install . --unsafe-perm --nodedir="/opt/graalvm-ce-19.0.2/jre/languages/js" --build-from-source
RUN git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git
RUN pip3 install -e jupyter_contrib_nbextensions
RUN cp -r varInspector jupyter_contrib_nbextensions/src/jupyter_contrib_nbextensions/nbextensions/
RUN jupyter contrib nbextensions install --user
RUN jupyter nbextension enable varInspector/main

WORKDIR /playground
EXPOSE 8888
CMD jupyter notebook --port=8888 --ip=0.0.0.0 --NotebookApp.token='' --allow-root --no-browser
